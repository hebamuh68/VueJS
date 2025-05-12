# Authentication Project with Vue.js and Django

This project implements a full-stack authentication system using Vue.js for the frontend and Django for the backend. It provides user registration, login, and authentication features.

## Project Structure

```
.
├── backend/           # Django backend application
│   ├── accounts/     # User authentication app
│   └── config/       # Django project configuration
├── frontend/         # Vue.js frontend application
│   ├── src/         # Source code
│   └── public/      # Static files
└── vue-dj/          # Additional Vue.js components
```

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- pnpm (Package manager)
- Virtual environment (recommended)

## Backend Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (admin):
   ```bash
   python manage.py createsuperuser
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend server will run on `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

The frontend application will run on `http://localhost:5173`

## Features

- User Registration
- User Login/Logout
- Protected Routes
- JWT Authentication
- Form Validation
- Responsive Design

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/user/` - Get current user information

## Development

### Backend Development

The backend is built with Django and uses Django REST Framework for API endpoints. Key features include:

- JWT Authentication
- Custom User Model
- RESTful API endpoints
- CORS configuration

### Frontend Development

The frontend is built with Vue.js 3 and uses:

- TypeScript for type safety
- Tailwind CSS for styling
- Vue Router for navigation
- Pinia for state management
- Axios for API requests

## Deployment

### Backend Deployment

1. Set up a production database
2. Configure environment variables
3. Run migrations
4. Set up a production server (e.g., Gunicorn)
5. Configure a reverse proxy (e.g., Nginx)

### Frontend Deployment

1. Build the production version:
   ```bash
   pnpm build
   ```
2. Deploy the contents of the `dist` directory to your web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 