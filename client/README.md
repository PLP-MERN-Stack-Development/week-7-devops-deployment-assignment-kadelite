# Portfolio Frontend

Modern, responsive React frontend for Adeleke Adekunle's portfolio website.

## Features

- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
- **Responsive Design**: Works perfectly on all device sizes
- **User Authentication**: Login/Register with JWT tokens
- **Comment System**: Leave comments and ratings
- **CV Upload**: Upload and manage CVs
- **Admin Panel**: Manage comments and CVs (admin only)
- **Smooth Animations**: Framer Motion for page transitions
- **Dark Mode Ready**: CSS variables for easy theming

## Technologies Used

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```

The app will be available at `http://localhost:3000`

3. **Build for Production**
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation component
│   ├── Footer.js       # Footer component
│   ├── ProtectedRoute.js # Route protection
│   └── AdminRoute.js   # Admin route protection
├── contexts/           # React contexts
│   ├── AuthContext.js  # Authentication context
│   └── ToastContext.js # Toast notifications
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── About.js        # About page
│   ├── Projects.js     # Projects showcase
│   ├── Contact.js      # Contact & comments
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   ├── Dashboard.js    # User dashboard
│   └── AdminPanel.js   # Admin panel
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## Key Components

### Authentication
- JWT token management
- Protected routes
- User profile management
- Role-based access control

### UI Components
- Responsive navigation
- Modern forms with validation
- Toast notifications
- Loading states
- Modal dialogs

### Features
- **Comments**: Users can leave comments and ratings
- **CV Upload**: File upload with progress tracking
- **Admin Panel**: Manage user submissions
- **Responsive Design**: Mobile-first approach

## Styling

The project uses Tailwind CSS with custom CSS variables for theming:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more variables */
}
```

## API Integration

The frontend communicates with the backend API:

- **Base URL**: `http://localhost:5000` (development)
- **Authentication**: JWT tokens in Authorization header
- **File Upload**: Multipart form data for CV uploads
- **Error Handling**: Toast notifications for user feedback

## Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1199px
- **Desktop**: 1200px+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Variables

Create a `.env` file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Deployment

1. **Build the application**
```bash
npm run build
```

2. **Deploy to your preferred platform**
   - Vercel (recommended for React apps)
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 