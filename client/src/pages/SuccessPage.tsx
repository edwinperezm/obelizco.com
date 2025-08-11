import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'success' | 'processing' | 'error'>('processing');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
          throw new Error('No session ID provided');
        }

        // Here you would typically verify the payment with your backend
        // For now, we'll simulate a successful verification
        setStatus('success');
      } catch (err) {
        console.error('Payment verification failed:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg">Verifying your payment...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          {error || 'There was an issue processing your payment. Please try again.'}
        </p>
        <button
          onClick={() => window.location.href = '/pricing'}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Pricing
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your payment was successful and your subscription is now active.
      </p>
      <a
        href="/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </a>
    </div>
  );
};
