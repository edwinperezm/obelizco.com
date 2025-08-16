const { spawn } = require('child_process');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.development' });

const log = (message, source = 'dev') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${source}] ${message}`);
};

// Start frontend
const startFrontend = () => {
  log('Starting frontend server...');
  const frontend = spawn('npm', ['run', 'dev:frontend'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_API_URL: process.env.VITE_API_URL || 'http://localhost:4000/api',
      VITE_STRIPE_PUBLISHABLE_KEY: process.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
      PORT: process.env.FRONTEND_PORT || '3001'
    }
  });

  frontend.on('error', (err) => {
    log(`Frontend error: ${err.message}`, 'frontend');
  });

  return frontend;
};

// Start backend
const startBackend = () => {
  log('Starting backend server...');
  const backend = spawn('npm', ['run', 'dev:backend'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development',
      PORT: '4000',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || ''
    }
  });

  backend.on('error', (err) => {
    log(`Backend error: ${err.message}`, 'backend');
  });

  return backend;
};

// Start both servers
const frontend = startFrontend();
const backend = startBackend();

// Handle process termination
process.on('SIGINT', () => {
  log('Shutting down servers...');
  frontend.kill();
  backend.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Shutting down servers...');
  frontend.kill();
  backend.kill();
  process.exit(0);
});

log('Development servers starting...');
log('Frontend: http://localhost:3001');
log('Backend: http://localhost:4000');
