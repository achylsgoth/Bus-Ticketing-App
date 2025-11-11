# bookings/views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer, BookingCreateSerializer

class BookingView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BookingCreateSerializer
        return BookingSerializer
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        schedule = serializer.validated_data['schedule']
        number_of_seats = serializer.validated_data['number_of_seats']
        
        # Check seat availability
        if schedule.available_seats < number_of_seats:
            raise serializers.ValidationError({"error": "Not enough seats available"})
        
        # Calculate total fare
        total_fare = schedule.fare * number_of_seats
        
        # Create booking
        booking = serializer.save(
            user=self.request.user,
            total_fare=total_fare
        )
        
        # Update available seats
        schedule.available_seats -= number_of_seats
        schedule.save()

class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
    
    def perform_destroy(self, instance):
        if instance.booking_status != 'confirmed':
            raise serializers.ValidationError({"error": "Only confirmed bookings can be cancelled"})
        
        # Restore available seats
        instance.schedule.available_seats += instance.number_of_seats
        instance.schedule.save()
        
        instance.booking_status = 'cancelled'
        instance.save()