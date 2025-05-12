from django.db import models
from django.contrib.auth.models import AbstractUser

# Define a custom user model by extending the AbstractUser class
class CustomUser(AbstractUser):
    
    # Override the default email field to make it unique
    email = models.EmailField(unique=True)

    # Set email as the unique identifier for authentication instead of username
    USERNAME_FIELD = 'email'
    # Specify required fields when creating a user
    REQUIRED_FIELDS = ['username']

    # String representation of the user object
    def __str__(self):
        return self.username
    
    # Add these fields to prevent clashes with the default AbstractUser fields
    groups = models.ManyToManyField(
        'auth.Group',  # Reference to the built-in Group model
        related_name='custom_user_set',  # Custom related name to avoid conflicts
        blank=True,  # Allow this field to be optional
        help_text='The groups this user belongs to.',  # Help text for the admin interface
        verbose_name='groups'  # Human-readable name for the field
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',  # Reference to the built-in Permission model
        related_name='custom_user_set',  # Custom related name to avoid conflicts
        blank=True,  # Allow this field to be optional
        help_text='Specific permissions for this user.',  # Help text for the admin interface
        verbose_name='user permissions'  # Human-readable name for the field
    )