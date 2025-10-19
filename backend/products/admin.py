from django.contrib import admin
from .models import Category, Product, ProductSpecification


class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'model', 'price', 'stock_quantity', 'is_active', 'created_at']
    list_filter = ['category', 'product_type', 'brand', 'is_active', 'created_at']
    search_fields = ['name', 'brand', 'model', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductSpecificationInline]
    list_editable = ['price', 'stock_quantity', 'is_active']


@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ['product', 'name', 'value']
    list_filter = ['product__category', 'product__brand']
    search_fields = ['product__name', 'name', 'value']
