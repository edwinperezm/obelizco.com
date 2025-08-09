import { Handler } from '@netlify/functions';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'http';
import { config } from 'dotenv';

// Load environment variables
config();

// Create Express app
const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/.netlify/functions/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.get('/.netlify/functions/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from Netlify Function with TypeScript!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Netlify Function handler
export const handler: Handler = async (event, context) => {
  try {
    // Convert Netlify event to Express request
    const request = {
      method: event.httpMethod,
      path: event.path.replace(/^\/\.netlify\/functions\/api/, ''),
      headers: event.headers,
      query: event.queryStringParameters,
      body: event.body ? JSON.parse(event.body) : {},
    };

    // Create a promise to handle the response
    return new Promise((resolve) => {
      const response: any = {
        statusCode: 200,
        headers: {},
        body: '',
        setHeader: (key: string, value: string) => {
          response.headers = { ...response.headers, [key.toLowerCase()]: value };
        },
        end: (data: string) => {
          if (data) {
            response.body = data;
          }
          resolve({
            statusCode: response.statusCode,
            headers: response.headers,
            body: response.body,
          });
        },
        status: (statusCode: number) => {
          response.statusCode = statusCode;
          return response;
        },
        json: (data: any) => {
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify(data));
        },
      };

      // Handle the request
      const next = () => {
        response.status(404).json({ error: 'Not Found' });
      };

      // Find the matching route
      const route = app._router.stack.find((layer: any) => {
        return layer.route && layer.route.path === request.path && layer.route.methods[request.method.toLowerCase()];
      });

      if (route) {
        route.handle({
          ...request,
          originalUrl: request.path,
          params: {},
          query: request.query,
          body: request.body,
          method: request.method,
          get: (key: string) => request.headers?.[key],
        }, response, next);
      } else {
        next();
      }
    });
  } catch (error) {
    console.error('Error in Netlify Function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
