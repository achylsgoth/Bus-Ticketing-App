from rest_framework import serializers
from .models import Booking, Payment
from buses.models import Schedule
from buses.serializers import ScheduleSerializer

class BookingSerializer(serializers.ModelSerializer):
    schedule_details = ScheduleSerializer(source='schedule', read_only=True)
    schedule = serializers.PrimaryKeyRelatedField(queryset=Schedule.objects.all(), write_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('user', 'status', 'booking_date', 'qr_code')
    
    def create(self, validated_data):
        user = self.context['request'].user
        return Booking.objects.create(user=user, **validated_data)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
