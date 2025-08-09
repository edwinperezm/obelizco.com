# Netlify Functions

This directory contains the serverless functions for the Obelizco website, deployed to Netlify.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later
- Netlify CLI (optional, for local development)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the environment variables in `.env`

### Development

To run the functions locally with Netlify Dev:

```bash
netlify dev
```

This will start the Netlify Dev server with hot-reloading for your functions.

### Building for Production

To build the functions for production:

```bash
npm run build
```

The built functions will be in the `dist` directory.

## 📁 Project Structure

```
netlify/functions/
├── src/                  # Source code for Netlify Functions
│   ├── health.ts        # Health check endpoint
│   └── index.ts         # Entry point for all functions
├── package.json         # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🌐 Available Endpoints

- `GET /.netlify/functions/health` - Health check endpoint

## 📝 Environment Variables

Create a `.env` file in this directory with the following variables:

```env
# Application
NODE_ENV=development

# Server
PORT=8888

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Session
SESSION_SECRET=your_session_secret
```

## 🧪 Testing

To run tests:

```bash
npm test
```

## 📦 Deployment

The functions are automatically deployed to Netlify when you push to the main branch. Make sure to set up the required environment variables in the Netlify dashboard.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
