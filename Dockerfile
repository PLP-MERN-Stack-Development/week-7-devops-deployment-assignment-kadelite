# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN cd client && npm ci --only=production
RUN cd server && npm ci --only=production

# Copy source code
COPY client/ ./client/
COPY server/ ./server/

# Build frontend
RUN cd client && npm run build:prod

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built frontend
COPY --from=builder --chown=nextjs:nodejs /app/client/build ./client/build

# Copy server files
COPY --from=builder --chown=nextjs:nodejs /app/server ./server

# Copy package files
COPY --from=builder /app/server/package*.json ./server/

# Install only production dependencies
RUN cd server && npm ci --only=production

# Create uploads directory
RUN mkdir -p server/uploads && chown nextjs:nodejs server/uploads

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/server.js"] 