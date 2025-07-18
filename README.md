# Adeleke Adekunle - Portfolio Website

A modern, responsive portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, comment system, and CV upload functionality.

## 🌟 Features

### Frontend (React + Tailwind CSS + Radix UI)
- **Modern Design**: Sleek, responsive design with gradient backgrounds and smooth animations
- **User Authentication**: Login/Register system with JWT tokens
- **Comment System**: Users can leave comments and ratings (requires approval)
- **CV Upload**: Users can upload their CVs for potential employers
- **Admin Panel**: Manage comments and CVs with approval workflow
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth page transitions and hover effects using Framer Motion

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete API with authentication, comments, and CV management
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: Multer middleware for CV file uploads
- **Input Validation**: Express-validator for form validation
- **Security**: Helmet, CORS, rate limiting, and other security measures
- **MongoDB**: NoSQL database with Mongoose ODM

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd week-7-devops-deployment-assignment-kadelite
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Environment Setup**

Create a `config.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

5. **Start the Development Servers**

Backend (Terminal 1):
```bash
cd server
npm run dev
```

Frontend (Terminal 2):
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
week-7-devops-deployment-assignment-kadelite/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── ...
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── uploads/           # File uploads directory
│   ├── package.json
│   └── server.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Comments
- `GET /api/comments` - Get approved comments (public)
- `POST /api/comments` - Create comment (protected)
- `GET /api/comments/all` - Get all comments (admin)
- `PUT /api/comments/:id/approve` - Approve/reject comment (admin)
- `DELETE /api/comments/:id` - Delete comment (admin)

### CV Management
- `POST /api/cv/upload` - Upload CV (protected)
- `GET /api/cv/my-cv` - Get user's CV (protected)
- `GET /api/cv/download/:id` - Download CV (admin)
- `GET /api/cv/all` - Get all CVs (admin)
- `PUT /api/cv/:id/approve` - Approve/reject CV (admin)
- `DELETE /api/cv/:id` - Delete CV (admin)

## 🎨 Technologies Used

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- Security headers with helmet
- CORS configuration
- File upload restrictions
- Protected routes

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 👤 Author

**Adeleke Adekunle**
- Email: mechatronics.samson@gmail.com
- GitHub: https://github.com/kadelite
- Location: Lagos, Nigeria

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, email mechatronics.samson@gmail.com or create an issue in the repository. 