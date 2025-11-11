# buses/models.py
from django.db import models
from django.core.validators import MinValueValidator

class Bus(models.Model):
    BUS_TYPES = [
        ('standard', 'Standard'),
        ('premium', 'Premium'),
        ('luxury', 'Luxury'),
    ]
    
    bus_number = models.CharField(max_length=20, unique=True)
    bus_type = models.CharField(max_length=20, choices=BUS_TYPES, default='standard')
    capacity = models.IntegerField(validators=[MinValueValidator(1)])
    amenities = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.bus_number} ({self.bus_type})"

class Route(models.Model):
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance = models.DecimalField(max_digits=6, decimal_places=2, help_text="Distance in kilometers")
    estimated_travel_time = models.DurationField(help_text="HH:MM:SS format")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['origin', 'destination']
    
    def __str__(self):
        return f"{self.origin} to {self.destination}"

class Schedule(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='schedules')
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='schedules')
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    fare = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)])
    available_seats = models.IntegerField(validators=[MinValueValidator(0)])
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['departure_time']
    
    def __str__(self):
        return f"{self.bus.bus_number} - {self.route} - {self.departure_time}"