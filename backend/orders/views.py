from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            response_serializer = OrderSerializer(order)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


@api_view(['POST'])
def create_order(request):
    """Create a new order"""
    serializer = OrderCreateSerializer(data=request.data)
    if serializer.is_valid():
        order = serializer.save()
        response_serializer = OrderSerializer(order)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    # Return more detailed error information
    error_message = 'Validation failed'
    if 'items' in serializer.errors:
        error_message = 'Invalid order items. Please check product prices and quantities.'
    elif any(field in serializer.errors for field in ['first_name', 'last_name', 'email', 'phone']):
        error_message = 'Please fill in all required contact information correctly.'
    elif any(field in serializer.errors for field in ['address', 'city', 'postal_code']):
        error_message = 'Please provide a complete delivery address.'
    
    return Response({
        'error': error_message,
        'details': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)