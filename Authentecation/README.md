# VueJS Authentication Project

This project is a full-stack authentication system built with Vue 3 (frontend) and Django REST Framework (backend).

## Project Structure

- **frontend/**: Vue 3 + Vite + Pinia + TypeScript + Tailwind
- **backend/**: Django REST Framework with SimpleJWT for authentication
- **vueDj/**: Python virtual environment for backend

## Implementation Guide

### 1. Backend Setup

1. Create and activate virtual environment:
   ```sh
   python -m venv vueDj
   source vueDj/bin/activate  # On Windows: vueDj\Scripts\activate
   ```

2. Install Django and required packages:
   ```sh
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

3. Create Django project and app:
   ```sh
   django-admin startproject config
   cd config
   python manage.py startapp accounts
   ```

4. Configure settings.py:
   - Add 'rest_framework', 'corsheaders', 'accounts' to INSTALLED_APPS
   - Add CORS settings
   - Configure JWT settings
   - Set up custom user model

5. Create models (accounts/models.py):
   ```python
   from django.contrib.auth.models import AbstractUser
   from django.db import models

   class CustomUser(AbstractUser):
       email = models.EmailField(unique=True)
       USERNAME_FIELD = 'email'
       REQUIRED_FIELDS = ['username']
   ```

6. Create serializers (accounts/serializers.py):
   ```python
   from rest_framework import serializers
   from .models import CustomUser

   class CustomUserSerializer(serializers.ModelSerializer):
       class Meta:
           model = CustomUser
           fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name', 'date_joined')
           extra_kwargs = {'password': {'write_only': True}}
   ```

7. Create views (accounts/views.py):
   - RegisterView
   - LoginView
   - CurrentUserView

8. Set up URLs (accounts/urls.py):
   ```python
   from django.urls import path
   from .views import RegisterView, LoginView, CurrentUserView

   urlpatterns = [
       path('register/', RegisterView.as_view(), name='register'),
       path('login/', LoginView.as_view(), name='login'),
       path('me/', CurrentUserView.as_view(), name='current-user'),
   ]
   ```

### 2. Frontend Setup

1. Create Vue project:
   ```sh
   npm create vite@latest frontend -- --template vue-ts
   cd frontend
   ```

2. Install dependencies:
   ```sh
   pnpm install
   pnpm add pinia vue-router axios @vuelidate/core @vuelidate/validators
   pnpm add -D tailwindcss postcss autoprefixer
   ```

3. Configure Tailwind CSS:
   ```sh
   npx tailwindcss init -p
   ```

4. Set up project structure:
   ```
   src/
   ├── assets/
   │   └── NavBar.vue
   ├── components/
   │   └── NavBar.vue
   ├── stores/
   │   └── auth.ts
   ├── services/
   │   ├── apiClient.ts
   │   └── auth.ts
   ├── types/
   │   └── auth.ts
   ├── views/
   │   ├── Home.vue
   │   ├── Login.vue
   │   └── Register.vue
   └── router/
       └── index.ts
   ```

5. Create authentication store (stores/auth.ts):
   - State: user, token
   - Actions: login, register, logout, fetchUser

6. Set up API client (services/apiClient.ts):
   - Configure axios instance
   - Add request interceptor for JWT
   - Add response interceptor for error handling

7. Create authentication service (services/auth.ts):
   - loginApi
   - registerApi
   - currentUserApi

8. Implement components:
   - NavBar.vue: Navigation with auth-aware links
   - Login.vue: Login form with validation
   - Register.vue: Registration form with validation
   - Home.vue: Protected dashboard

### 3. Running the Project

1. Start the backend:
   ```sh
   cd backend
   source ../vueDj/bin/activate
   python manage.py migrate
   python manage.py runserver
   ```

2. Start the frontend:
   ```sh
   cd frontend
   pnpm dev
   ```

## Features

- User registration and login with JWT authentication
- Protected routes with automatic redirection
- Form validation using Vuelidate
- Responsive design with Tailwind CSS
- Type safety with TypeScript
- State management with Pinia
- Modern UI with gradient backgrounds and card layouts

## Authentication Flow

1. **Registration**:
   - User fills registration form
   - Backend creates user and returns JWT
   - Frontend stores token and redirects to home

2. **Login**:
   - User enters credentials
   - Backend validates and returns JWT
   - Frontend stores token and redirects to home

3. **Protected Routes**:
   - Router checks for valid token
   - Unauthorized users are redirected to login
   - Token is automatically added to API requests

4. **Logout**:
   - Token is removed from localStorage
   - User is redirected to login page
   - Auth state is cleared

## Error Handling

- Form validation errors
- API error messages
- Network error handling
- Token expiration handling
- Automatic logout on invalid token

## Styling

- Tailwind CSS for utility-first styling
- Custom components with scoped CSS
- Responsive design for all screen sizes
- Modern UI with gradients and shadows
- Consistent color scheme and typography

## License

This project is licensed under the MIT License. 