# Obelizco Website

A modern e-commerce website built with Vite, React, TypeScript, and Netlify Functions. This project features a seamless payment integration with Stripe and follows best practices for serverless architecture.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later
- Netlify CLI (for local development)
- Stripe account (for payment processing)
- PostgreSQL database (local or remote)

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/edwinperezm/obelizco.com.git
   cd obelizco.com
   ```

2. **Install dependencies**:
   ```bash
   npm install
   cd netlify/functions && npm install && cd ../..
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```

4. **Start the development server**:
   ```bash
   # In one terminal (frontend)
   npm run dev

   # In another terminal (Netlify Functions)
   npx netlify dev
   ```

### Available Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run test`: Run tests
- `npx netlify dev`: Run Netlify Functions locally

### Environment Variables

See [TERMINOLOGY.md](TERMINOLOGY.md) for detailed information about required environment variables.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Netlify Functions** - Serverless functions
- **Stripe** - Payment processing
- **Drizzle ORM** - TypeScript ORM for database
- **PostgreSQL** - Primary database

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Testing framework

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI Primitives
- **API**: Netlify Functions
- **Deployment**: Netlify

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── public/            # Static files
│   └── src/               # Application source code
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions
│       ├── styles/        # Global styles
│       └── App.tsx        # Main application component
├── netlify/               # Netlify configuration
│   └── functions/         # Serverless functions
├── public/                # Public assets
├── .env.example           # Example environment variables
├── index.html             # Main HTML file
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🌐 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Application
NODE_ENV=development
VITE_API_URL=/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Server
PORT=5001
SESSION_SECRET=your_session_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 🚀 Deployment

### Netlify

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Set up the following environment variables in the Netlify dashboard:
   - `NODE_ENV`: `production`
   - `VITE_API_URL`: `/.netlify/functions`
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
   - `SESSION_SECRET`: A random string for session encryption

4. Set the build command:
   ```
   npm run build
   ```

5. Set the publish directory:
   ```
   dist
   ```

6. Set the functions directory:
   ```
   netlify/functions/dist
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
