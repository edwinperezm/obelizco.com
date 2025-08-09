// Netlify Function for API requests
const { createRequestHandler } = require('@netlify/functions');
const { createServer } = require('./server');

// Create a server instance from your existing server code
const server = createServer();

// Export the Netlify Function handler
exports.handler = createRequestHandler({
  handle: async (event, context) => {
    // Convert Netlify event to Node.js request/response
    const { req, res, responsePromise } = createMockReqRes(event);
    
    // Let the server handle the request
    await server.emit('request', req, res);
    
    // Wait for the response to be fully processed
    return responsePromise;
  },
});

// Helper function to convert Netlify event to Node.js request/response
function createMockReqRes(event) {
  const response = {
    statusCode: 200,
    headers: {},
    body: '',
    isBase64Encoded: false,
  };
  
  const responsePromise = new Promise((resolve) => {
    const res = {
      statusCode: 200,
      _headers: {},
      setHeader: function(key, value) {
        this._headers[key.toLowerCase()] = value;
      },
      getHeader: function(key) {
        return this._headers[key.toLowerCase()];
      },
      removeHeader: function(key) {
        delete this._headers[key.toLowerCase()];
      },
      writeHead: function(statusCode, headers) {
        this.statusCode = statusCode;
        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            this.setHeader(key, value);
          });
        }
      },
      end: function(data, encoding) {
        if (data) {
          this.body = this.body ? this.body + data : data;
        }
        
        response.statusCode = this.statusCode;
        response.headers = this._headers;
        response.body = this.body;
        
        // If the response is JSON, parse it
        if (response.headers['content-type']?.includes('application/json') && typeof response.body === 'string') {
          try {
            response.body = JSON.parse(response.body);
          } catch (e) {
            // If parsing fails, leave as is
          }
        }
        
        resolve(response);
      },
      write: function(data) {
        this.body = this.body ? this.body + data : data;
      },
      setHeader: function(key, value) {
        this._headers[key.toLowerCase()] = value;
      },
      getHeader: function(key) {
        return this._headers[key.toLowerCase()];
      },
      removeHeader: function(key) {
        delete this._headers[key.toLowerCase()];
      },
    };
    
    const req = {
      method: event.httpMethod,
      url: event.path,
      headers: event.headers || {},
      connection: { encrypted: event.headers['x-forwarded-proto'] === 'https' },
      on: function(eventName, callback) {
        if (eventName === 'data' && event.body) {
          callback(Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8'));
        }
        if (eventName === 'end') {
          callback();
        }
      },
    };
    
    return { req, res };
  });
  
  return { ...responsePromise, responsePromise };
}
