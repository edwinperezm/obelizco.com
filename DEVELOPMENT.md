# Development Guide

## 🏠 Local Development vs 🚀 Netlify Production

This project has a clear separation between local development and production deployment:

### Local Development Environment

**Purpose**: For coding, testing, and debugging locally

**Setup**:
```bash
# Start both frontend and backend locally
npm run dev

# Or start them separately:
npm run dev:frontend  # Vite dev server on port 3001
npm run dev:server    # Express server on port 4000
```

**Architecture**:
- **Frontend**: Vite dev server (http://localhost:3001)
- **Backend**: Express.js server (http://localhost:4000)
- **Stripe**: Uses test keys from `.env.development`
- **Database**: Local development database

**Environment Files**:
- `.env.development` - Local development configuration
- `server/.env` - Backend server configuration

### Netlify Production Environment

**Purpose**: Live production website after git push

**Setup**:
```bash
# Deploy to Netlify (happens automatically on git push)
git add .
git commit -m "your changes"
git push origin main
```

**Architecture**:
- **Frontend**: Static build served by Netlify CDN
- **Backend**: Netlify serverless functions
- **Stripe**: Uses production keys from `.env.production`
- **Database**: Production database

**Environment Files**:
- `.env.production` - Production configuration
- Netlify environment variables (set in Netlify dashboard)

## 🔧 Development Workflow

### 1. Local Development
```bash
npm run dev           # Start local development
```
- Edit code and see changes instantly
- Test Stripe checkout with test keys
- Debug with full server logs

### 2. Production Deployment
```bash
git add .
git commit -m "feat: your feature"
git push origin main  # Automatically deploys to Netlify
```

## 🔑 Environment Variables

### Local Development
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe test publishable key
- `STRIPE_SECRET_KEY` - Stripe test secret key (in server/.env)

### Netlify Production
- Set in Netlify dashboard under Site Settings > Environment Variables
- Uses production Stripe keys

## 🚨 Important Notes

- **Never commit sensitive keys** to git
- **Local development** uses Express server on port 4000
- **Production** uses Netlify serverless functions
- **Stripe test mode** in development, **live mode** in production
