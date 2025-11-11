from django.urls import path
from . import views

urlpatterns = [
    # Buses endpoints
    path('buses/', views.BusView.as_view(), name='bus-list'),
    path('buses/<int:pk>/', views.BusDetailView.as_view(), name='bus-detail'),
    
    # Routes endpoints
    path('routes/', views.RouteView.as_view(), name='route-list'),
    path('routes/<int:pk>/', views.RouteDetailView.as_view(), name='route-detail'),
    
    # Schedules endpoints
    path('schedules/', views.ScheduleView.as_view(), name='schedule-list'),
    path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),
    
    # Admin utilities
    path('admin/create-sample-data/', views.create_sample_data, name='create-sample-data'),
]