# authentication/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from .serializers import UserRegistrationSerializer, UserProfileSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        return self.request.user