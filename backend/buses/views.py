from rest_framework import viewsets, permissions
from .models import Bus, Route, Schedule
from .serializers import BusSerializer, RouteSerializer, ScheduleSerializer

class IsAdminOrCompanyOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role in ['admin', 'company']

class BusViewSet(viewsets.ModelViewSet):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [IsAdminOrCompanyOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)

class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [IsAdminOrCompanyOrReadOnly]

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAdminOrCompanyOrReadOnly]
