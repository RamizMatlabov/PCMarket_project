from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/featured/', views.featured_products, name='featured-products'),
    path('products/categories/', views.product_categories, name='product-categories'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'),
]
