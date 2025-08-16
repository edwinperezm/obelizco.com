// client/src/utils/checkout.ts
const getApiBaseUrl = () => {
  // Local development: use Express server
  if (import.meta.env.DEV) {
    return 'http://localhost:4000/api/stripe';
  }
  // Netlify production: use serverless functions
  return '/api/stripe';
};

export const handleCheckout = async (productName: string, amount: number, currency: string = 'usd') => {
  const endpoint = getApiBaseUrl();
  console.log('Initiating checkout with:', { 
    endpoint, 
    productName, 
    amount, 
    currency 
  });
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, amount, currency }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No URL returned from checkout');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

export const PRODUCTS = {
  journal: {
    name: 'Journal de 21 Días de Desescolarización',
    price: 1500, // in cents
    currency: 'usd',
  },
};