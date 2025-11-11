# bookings/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('bookings/', views.BookingView.as_view(), name='booking-list'),
    path('bookings/<int:pk>/', views.BookingDetailView.as_view(), name='booking-detail'),
]