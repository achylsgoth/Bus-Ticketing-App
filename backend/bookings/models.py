from django.db import models
from django.conf import settings
from buses.models import Schedule

class Booking(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='bookings')
    seat_number = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    booking_date = models.DateTimeField(auto_now_add=True)
    qr_code = models.ImageField(upload_to='qrcodes/', blank=True, null=True)

    class Meta:
        unique_together = ('schedule', 'seat_number')

    def __str__(self):
        return f"{self.user} - {self.schedule} - Seat {self.seat_number}"

class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=100)
    paid_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='SUCCESS')
