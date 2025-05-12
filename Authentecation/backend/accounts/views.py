from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# View for user registration
class RegisterView(generics.CreateAPIView):
    # Specify the serializer class to handle user registration data
    serializer_class = CustomUserSerializer

    # Override the create method to handle custom response
    def create(self, request, *args, **kwargs):
        # Deserialize and validate the incoming request data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Save the validated data to create a new user
        self.perform_create(serializer)
        # Generates HTTP headers (like Location), useful for APIs.
        headers = self.get_success_headers(serializer.data)
        # Returns a 201 Created response with the newly created user info.
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# View for user login using JWT
class LoginView(TokenObtainPairView):
    # Specify the serializer class to handle login and token generation
    serializer_class = CustomTokenObtainPairSerializer