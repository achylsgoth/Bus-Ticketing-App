from rest_framework import viewsets, permissions
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Booking.objects.none()
        
        if user.role == 'admin':
            return Booking.objects.all()
        if user.role == 'company':
            # View bookings for schedules of buses owned by this company
            return Booking.objects.filter(schedule__bus__company=user)
        # Normal user sees their own bookings
        return Booking.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
