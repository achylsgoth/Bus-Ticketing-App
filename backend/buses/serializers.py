from rest_framework import serializers
from .models import Bus, Route, Schedule

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'
        read_only_fields = ('company',)

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    bus_details = BusSerializer(source='bus', read_only=True)
    bus = serializers.PrimaryKeyRelatedField(queryset=Bus.objects.all(), write_only=True)
    
    route_details = RouteSerializer(source='route', read_only=True)
    route = serializers.PrimaryKeyRelatedField(queryset=Route.objects.all(), write_only=True)

    class Meta:
        model = Schedule
        fields = '__all__'
