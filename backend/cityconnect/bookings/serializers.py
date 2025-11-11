# bookings/serializers.py
from rest_framework import serializers
from .models import Booking
from buses.serializers import ScheduleSerializer
from authentication.serializers import UserProfileSerializer

class BookingSerializer(serializers.ModelSerializer):
    schedule_details = ScheduleSerializer(source='schedule', read_only=True)
    user_details = UserProfileSerializer(source='user', read_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['booking_number', 'total_fare', 'created_at', 'updated_at']

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['schedule', 'number_of_seats']