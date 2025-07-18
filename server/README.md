# Portfolio Backend API

Backend API for Adeleke Adekunle's Portfolio Site built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- JWT-based authentication
- Comment system with approval workflow
- CV upload and download functionality
- Admin panel for managing comments and CVs
- File upload handling with multer
- Input validation and sanitization
- Rate limiting and security headers

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

3. Make sure MongoDB is running on your system

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Comments
- `GET /api/comments` - Get all approved comments (public)
- `POST /api/comments` - Create a new comment (protected)
- `GET /api/comments/all` - Get all comments (admin only)
- `PUT /api/comments/:id/approve` - Approve/reject comment (admin only)
- `DELETE /api/comments/:id` - Delete comment (admin only)

### CV Management
- `POST /api/cv/upload` - Upload CV (protected)
- `GET /api/cv/my-cv` - Get user's CV (protected)
- `GET /api/cv/download/:id` - Download CV (admin only)
- `GET /api/cv/all` - Get all CVs (admin only)
- `PUT /api/cv/:id/approve` - Approve/reject CV (admin only)
- `DELETE /api/cv/:id` - Delete CV (admin only)

## Database Models

### User
- name, email, password, role, avatar, createdAt

### Comment
- user (ref), name, email, message, rating, isApproved, createdAt

### CV
- user (ref), name, email, fileName, originalName, filePath, fileSize, mimeType, isApproved, createdAt

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation with express-validator
- Rate limiting
- Security headers with helmet
- CORS configuration
- File upload restrictions

## File Upload

- Supported formats: PDF, DOC, DOCX
- Maximum file size: 5MB
- Files stored in `/uploads` directory
- Unique filename generation to prevent conflicts 