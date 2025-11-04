from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductListSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'product_type', 'brand']
    search_fields = ['name', 'description', 'brand', 'model']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'


@api_view(['GET'])
def featured_products(request):
    """Get featured products (computers, all-in-one, laptops)"""
    # Get categories for computers, all-in-one, and laptops
    computer_categories = Category.objects.filter(
        slug__in=['computers', 'all-in-one', 'laptops']
    )
    
    # Get products with product_type='computer' from these categories
    products = Product.objects.filter(
        is_active=True,
        product_type='computer',
        category__in=computer_categories
    ).order_by('-created_at')[:8]
    
    serializer = ProductListSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def product_categories(request):
    """Get all categories with product counts"""
    categories = Category.objects.all()
    data = []
    for category in categories:
        product_count = category.products.filter(is_active=True).count()
        data.append({
            'id': category.id,
            'name': category.name,
            'slug': category.slug,
            'product_count': product_count,
            'image': request.build_absolute_uri(category.image.url) if category.image else None
        })
    return Response(data)