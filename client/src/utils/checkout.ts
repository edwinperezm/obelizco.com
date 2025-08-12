// Get the base API URL based on the environment
const getApiBaseUrl = () => {
  // In development, use the full URL with port 5000
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  // In production, use the relative path (handled by Netlify redirects)
  return '';
};

export const handleCheckout = async (productName: string, amount: number, currency: string = 'usd') => {
  try {
    const baseUrl = getApiBaseUrl();
    const endpoint = `${baseUrl}/.netlify/functions/checkout`;
    console.log('Initiating checkout with:', { 
      endpoint, 
      productName, 
      amount, 
      currency,
      env: {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_NETLIFY_DEV: import.meta.env.VITE_NETLIFY_DEV,
        PROD: import.meta.env.PROD,
        DEV: import.meta.env.DEV,
      }
    });
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName,
        amount,
        currency,
      }),
    });

    const responseData = await response.text();
    console.log('Checkout response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseData
    });
    
    if (!response.ok) {
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseData);
      } catch (e) {
        errorDetails = responseData;
      }
      console.error('Checkout failed:', { 
        status: response.status, 
        error: errorDetails 
      });
      throw new Error(`Checkout failed: ${response.status} - ${JSON.stringify(errorDetails)}`);
    }

    const responseJson = JSON.parse(responseData);
    console.log('Checkout response data:', responseJson);
    
    if (responseJson.url) {
      window.location.href = responseJson.url;
    } else {
      console.error('No URL in response:', responseJson);
      throw new Error('No URL returned from checkout');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to initiate checkout. Please try again.';
    alert(`Error: ${errorMessage}`);
  }
};

// Product configurations
export const PRODUCTS = {
  journal: {
    name: 'Journal de 21 Días de Desescolarización',
    price: 1500, // $15.00 in cents
    currency: 'usd',
  },
  // Add other products here if needed
};
