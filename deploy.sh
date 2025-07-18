#!/bin/bash

# Production Deployment Script
echo "🚀 Starting production deployment..."

# Set environment
export NODE_ENV=production

# Install dependencies
echo "📦 Installing dependencies..."
cd client && pnpm install --production=false
cd ../server && pnpm install --production=false

# Build frontend
echo "🔨 Building frontend..."
cd ../client
pnpm run build:prod

# Check build success
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
pnpm run test:coverage

# Build backend (if needed)
echo "🔨 Preparing backend..."
cd ../server

# Create production config
echo "📝 Creating production configuration..."
cat > .env.production << EOF
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRE=30d
EOF

echo "✅ Production deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env.production with your actual values"
echo "2. Deploy to your hosting platform (Vercel, Netlify, etc.)"
echo "3. Set up your production database"
echo "4. Configure your domain and SSL"
echo ""
echo "🌐 For frontend deployment:"
echo "   - Vercel: vercel --prod"
echo "   - Netlify: netlify deploy --prod"
echo "   - AWS S3: aws s3 sync build/ s3://your-bucket"
echo ""
echo "🖥️  For backend deployment:"
echo "   - Heroku: git push heroku main"
echo "   - DigitalOcean: docker-compose up -d"
echo "   - AWS EC2: pm2 start server.js" 