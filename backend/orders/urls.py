from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('create-order/', views.create_order, name='create-order'),
]
