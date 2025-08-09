import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment intent on the server
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1500, // $15.00 in cents
          currency: 'usd',
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
      console.error('Payment error:', err);
    }
  };

  if (succeeded) {
    return (
      <div className="text-center py-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
        <p className="text-gray-600">Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border rounded-lg p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium"
      >
        {loading ? 'Processing...' : `Pay $15.00`}
      </Button>
    </form>
  );
};
