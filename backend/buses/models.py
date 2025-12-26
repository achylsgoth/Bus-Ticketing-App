from django.db import models
from django.conf import settings

class Route(models.Model):
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    duration = models.DurationField(help_text="Duration of the trip")
    distance = models.DecimalField(max_digits=10, decimal_places=2, help_text="Distance in km")
    
    def __str__(self):
        return f"{self.origin} - {self.destination}"

class Bus(models.Model):
    BUS_TYPES = (
        ('AC', 'AC'),
        ('NON_AC', 'Non-AC'),
        ('LUXURY', 'Luxury'),
    )
    company = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'company'})
    name = models.CharField(max_length=100)
    license_plate = models.CharField(max_length=20, unique=True)
    bus_type = models.CharField(max_length=20, choices=BUS_TYPES)
    capacity = models.PositiveIntegerField(default=30)
    image = models.ImageField(upload_to='buses/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.license_plate})"

class Schedule(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='schedules')
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='schedules')
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.bus} on {self.route} at {self.departure_time}"
