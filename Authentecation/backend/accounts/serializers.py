from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializer for the CustomUser model
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name', 'date_joined')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
            'date_joined': {'read_only': True}
        }

    # Override the create method to handle user creation with hashed passwords
    def create(self, validated_data):
        # Use the create_user method to ensure the password is hashed
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

# Custom serializer for obtaining JWT tokens with additional claims
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Get the default token from the parent class
        token = super().get_token(user)
        # Add custom claims to the token (e.g., user's email)
        token['email'] = user.email
        return token