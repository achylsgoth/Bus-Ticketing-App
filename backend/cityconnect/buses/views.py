# buses/views.py
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.utils import timezone
from .models import Bus, Route, Schedule
from .serializers import BusSerializer, RouteSerializer, ScheduleSerializer

class BusView(generics.ListCreateAPIView):
    queryset = Bus.objects.filter(is_active=True)
    serializer_class = BusSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['bus_number', 'bus_type']
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [IsAuthenticated()]

class BusDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [IsAdminUser]

class RouteView(generics.ListCreateAPIView):
    queryset = Route.objects.filter(is_active=True)
    serializer_class = RouteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['origin', 'destination']
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [IsAuthenticated()]

class RouteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [IsAdminUser]

class ScheduleView(generics.ListCreateAPIView):
    queryset = Schedule.objects.filter(is_active=True, departure_time__gte=timezone.now())
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['route__origin', 'route__destination']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by origin and destination
        origin = self.request.query_params.get('origin')
        destination = self.request.query_params.get('destination')
        date = self.request.query_params.get('date')
        
        if origin:
            queryset = queryset.filter(route__origin__icontains=origin)
        if destination:
            queryset = queryset.filter(route__destination__icontains=destination)
        if date:
            queryset = queryset.filter(departure_time__date=date)
        
        return queryset
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [IsAuthenticated()]

class ScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAdminUser]

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_sample_data(request):
    """Create sample data for testing"""
    # Create sample buses
    bus1 = Bus.objects.create(bus_number="BUS001", bus_type="standard", capacity=40)
    bus2 = Bus.objects.create(bus_number="BUS002", bus_type="premium", capacity=35)
    
    # Create sample routes
    route1 = Route.objects.create(
        origin="New York", 
        destination="Boston", 
        distance=350, 
        estimated_travel_time="04:30:00"
    )
    route2 = Route.objects.create(
        origin="New York", 
        destination="Washington DC", 
        distance=365, 
        estimated_travel_time="04:45:00"
    )
    
    # Create sample schedules
    from datetime import datetime, timedelta
    tomorrow = timezone.now() + timedelta(days=1)
    
    schedule1 = Schedule.objects.create(
        bus=bus1,
        route=route1,
        departure_time=tomorrow.replace(hour=8, minute=0, second=0, microsecond=0),
        arrival_time=tomorrow.replace(hour=12, minute=30, second=0, microsecond=0),
        fare=45.00,
        available_seats=40
    )
    
    schedule2 = Schedule.objects.create(
        bus=bus2,
        route=route2,
        departure_time=tomorrow.replace(hour=10, minute=0, second=0, microsecond=0),
        arrival_time=tomorrow.replace(hour=14, minute=45, second=0, microsecond=0),
        fare=55.00,
        available_seats=35
    )
    
    return Response({"message": "Sample data created successfully"})