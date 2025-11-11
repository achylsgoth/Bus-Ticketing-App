# bookings/models.py
from django.db import models
from django.core.validators import MinValueValidator
from authentication.models import User
from buses.models import Schedule

class Booking(models.Model):
    BOOKING_STATUS = [
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='bookings')
    booking_number = models.CharField(max_length=10, unique=True)
    number_of_seats = models.IntegerField(validators=[MinValueValidator(1)])
    total_fare = models.DecimalField(max_digits=10, decimal_places=2)
    booking_status = models.CharField(max_length=20, choices=BOOKING_STATUS, default='confirmed')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.booking_number:
            self.booking_number = f"BK{self.id:06d}" if self.id else "TEMP"
        super().save(*args, **kwargs)
        if self.booking_number == "TEMP":
            self.booking_number = f"BK{self.id:06d}"
            super().save(update_fields=['booking_number'])
    
    def __str__(self):
        return f"{self.booking_number} - {self.user.email}"