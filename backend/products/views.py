from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductListSerializer, ProductCreateSerializer, ProductUpdateSerializer
from .pagination import ProductPagination


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductListSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'product_type', 'brand']
    search_fields = ['name', 'description', 'brand', 'model']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    
    def get_object(self):
        obj = get_object_or_404(Product, slug=self.kwargs['slug'])
        # If user is authenticated and is the creator, allow access even if inactive
        # Otherwise, only allow access to active products
        if (self.request.user.is_authenticated and 
            obj.created_by and 
            obj.created_by == self.request.user):
            return obj
        if not obj.is_active:
            raise NotFound("Товар не найден.")
        return obj


@api_view(['GET'])
def featured_products(request):
    """Get featured products (computers, all-in-one, laptops)"""
    # Get categories for computers, all-in-one, and laptops
    computer_categories = Category.objects.filter(
        slug__in=['computers', 'all-in-one', 'laptops']
    )
    
    # Get products with product_type='computer' or 'all-in-one' from these categories
    products_queryset = Product.objects.filter(
        is_active=True,
        product_type__in=['computer', 'all-in-one'],
        category__in=computer_categories
    ).order_by('-created_at')
    
    products = list(products_queryset[:8])
    product_ids = [p.id for p in products]
    
    # If we don't have enough products, get any active products
    if len(products) < 8:
        additional_products = Product.objects.filter(
            is_active=True
        ).exclude(
            id__in=product_ids
        ).order_by('-created_at')[:8 - len(products)]
        products.extend(list(additional_products))
    
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


class ProductCreateView(generics.CreateAPIView):
    """Create a new product (requires authentication)"""
    queryset = Product.objects.all()
    serializer_class = ProductCreateSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ProductUpdateView(generics.UpdateAPIView):
    """Update a product (only by creator)"""
    queryset = Product.objects.all()
    serializer_class = ProductUpdateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'
    
    def get_object(self):
        obj = get_object_or_404(Product, slug=self.kwargs['slug'])
        # Check if user is the creator
        if not obj.created_by or obj.created_by != self.request.user:
            raise PermissionDenied("Вы можете редактировать только свои товары.")
        return obj


class ProductDeleteView(generics.DestroyAPIView):
    """Delete a product (only by creator)"""
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'
    
    def get_object(self):
        obj = get_object_or_404(Product, slug=self.kwargs['slug'])
        # Check if user is the creator
        if not obj.created_by or obj.created_by != self.request.user:
            raise PermissionDenied("Вы можете удалять только свои товары.")
        return obj
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)