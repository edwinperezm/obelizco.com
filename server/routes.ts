import { Express } from 'express';
import { createServer, Server } from 'http';
import { paymentsRouter } from './routes/payments';

export function registerRoutes(app: Express): Server {
  // API routes
  app.use('/api/payments', paymentsRouter);

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
