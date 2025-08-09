// Simple test function for Netlify
const { Handler } = require('@netlify/functions');

exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello from Netlify Function!',
        event: event,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' }),
    };
  }
};
