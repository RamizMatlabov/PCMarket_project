from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    # Более специфичные пути должны идти перед общими
    path('products/featured/', views.featured_products, name='featured-products'),
    path('products/categories/', views.product_categories, name='product-categories'),
    path('products/create/', views.ProductCreateView.as_view(), name='product-create'),
    path('products/<slug:slug>/update/', views.ProductUpdateView.as_view(), name='product-update'),
    path('products/<slug:slug>/delete/', views.ProductDeleteView.as_view(), name='product-delete'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
]
