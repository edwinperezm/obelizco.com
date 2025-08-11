# Project Terminology

## Core Technologies

### Frontend Stack
- **Vite**: Next Generation Frontend Tooling
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Netlify**: Cloud platform for web applications and static websites

### Backend Stack
- **Netlify Functions**: Serverless functions for backend logic
- **Stripe**: Payment processing platform
- **Drizzle ORM**: TypeScript ORM for database operations
- **PostgreSQL**: Primary database (via Supabase)

## API Architecture

### Endpoints
- `GET /api/health`: Health check endpoint
- `POST /api/payments/create-checkout-session`: Create a new Stripe checkout session
- `POST /api/webhooks/stripe`: Stripe webhook handler for payment events

### Request/Response Flow
1. Frontend makes API calls to Netlify Functions
2. Functions handle business logic and database operations
3. Responses are returned in a consistent JSON format
4. Error handling follows RESTful conventions

## Payment Processing

### Stripe Integration
- **Stripe**: Payment processing platform used for handling transactions
- **Price ID**: Unique identifier for a product's pricing in Stripe (e.g., `price_abc123`)
- **Checkout Session**: A Stripe object representing a customer's payment session
- **Payment Intent**: Represents a payment flow in Stripe
- **Webhook**: Automated messages sent from Stripe about payment events

### Modes
- **Test Mode**: Environment for testing payments without processing real money
- **Live Mode**: Production environment where real payments are processed

### Test Cards
- `4242 4242 4242 4242`: Generic successful test card
- `4000 0025 0000 3155`: Requires 3D Secure authentication
- `4000 0000 0000 0002`: Card declined (general)
- `4000 0027 6000 3184`: Card requires SCA (Strong Customer Authentication)

## Environment Variables

### Required for Development
```env
# Application
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

# Database (if using local DB)
# DATABASE_URL=postgresql://user:password@localhost:5432/obelizco
```

### Required for Production
```env
# Application
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...

# Database (Netlify environment variables)
# DATABASE_URL=postgresql://user:password@host:5432/dbname
```

## Project Structure

### Frontend (Client)
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
│   ├── Checkout/   # Checkout flow
│   ├── Success/    # Success page
│   └── Canceled/   # Canceled payment page
├── lib/
│   ├── api/        # API client and types
│   └── utils/      # Utility functions
└── styles/         # Global styles and Tailwind config
```

### Backend (Netlify Functions)
```
netlify/
└── functions/
    └── src/
        ├── handlers/     # Request handlers
        ├── db/           # Database models and migrations
        ├── lib/          # Shared utilities
        └── types/        # TypeScript type definitions
```

### Key Files
- `vite.config.ts`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `netlify.toml`: Netlify deployment configuration

### Backend (Server)
- `/server/routes/`: API route handlers
  - `payments.ts`: Handles payment-related endpoints
- `/server/config/`: Configuration files
  - `stripe.ts`: Stripe SDK initialization

## Common Terms

### Payment Flow
1. **Checkout Initiation**: User clicks "Comprar Ahora"
2. **Session Creation**: Backend creates a Stripe Checkout Session
3. **Payment Processing**: User completes payment on Stripe's hosted page
4. **Redirection**: User is redirected to success/cancel page

### Security
- **PCI Compliance**: Security standard for handling card data
- **HTTPS**: Required for all payment-related pages
- **Environment Variables**: Used to store sensitive keys and configurations

### Development
- **Test Mode**: Use test cards and test API keys
- **Webhook Testing**: Use Stripe CLI for local testing
- **Error Handling**: Implement proper error boundaries and user feedback

## Error Handling

### Common Errors
- **Card Declined**: Payment method was not accepted
- **Authentication Required**: 3D Secure verification needed
- **Invalid Request**: Missing or incorrect parameters
- **API Error**: Issue with Stripe's API

### Debugging
1. Check server logs for detailed error messages
2. Verify environment variables are set correctly
3. Test with different test cards to isolate issues

## Best Practices

### Frontend
- Never expose secret keys in client-side code
- Use environment variables for configuration
- Implement loading states during payment processing

### Backend
- Validate all input data
- Use proper error handling and logging
- Implement rate limiting for payment endpoints

### Security
- Keep API keys secure and never commit them to version control
- Use HTTPS in production
- Regularly update dependencies

---
*Last Updated: August 2025*
