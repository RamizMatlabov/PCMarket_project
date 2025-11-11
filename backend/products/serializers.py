from rest_framework import serializers
from django.utils.text import slugify
from .models import Category, Product, ProductSpecification


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ['name', 'value']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'category',
            'product_type', 'brand', 'model', 'image', 'image_url',
            'stock_quantity', 'is_active', 'is_in_stock', 'specifications',
            'created_by', 'created_at', 'updated_at'
        ]
    
    def get_created_by(self, obj):
        if obj.created_by:
            return {
                'id': obj.created_by.id,
                'username': obj.created_by.username
            }
        return None

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'price', 'category', 'product_type',
            'brand', 'model', 'image', 'image_url', 'stock_quantity',
            'is_in_stock', 'created_at'
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None


class ProductCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'category', 'product_type',
            'brand', 'model', 'image', 'stock_quantity'
        ]
        extra_kwargs = {
            'slug': {'read_only': True},
        }
    
    def create(self, validated_data):
        # Auto-generate slug from name
        name = validated_data['name']
        base_slug = slugify(name)
        slug = base_slug
        counter = 1
        
        # Ensure unique slug
        while Product.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        validated_data['slug'] = slug
        
        # Set is_active to True by default
        validated_data['is_active'] = True
        
        # created_by will be set by perform_create in the view
        return super().create(validated_data)


class ProductUpdateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)
    
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'category', 'product_type',
            'brand', 'model', 'image', 'stock_quantity', 'is_active'
        ]
        extra_kwargs = {
            'slug': {'read_only': True},
        }
    
    def update(self, instance, validated_data):
        # If name is being updated, regenerate slug
        if 'name' in validated_data and validated_data['name'] != instance.name:
            name = validated_data['name']
            base_slug = slugify(name)
            slug = base_slug
            counter = 1
            
            # Ensure unique slug (excluding current instance)
            while Product.objects.filter(slug=slug).exclude(pk=instance.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            validated_data['slug'] = slug
        
        return super().update(instance, validated_data)
