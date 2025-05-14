from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

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
        user = self.perform_create(serializer)
        
        # Generate tokens for the new user
        refresh = RefreshToken.for_user(user)
        
        # Return both user data and tokens
        return Response({
            'user': serializer.data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save()

# View for user login using JWT
class LoginView(TokenObtainPairView):
    # Specify the serializer class to handle login and token generation
    serializer_class = CustomTokenObtainPairSerializer

# View for getting current user information
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get(self, request):
        """
        Return the current authenticated user's information
        """
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)