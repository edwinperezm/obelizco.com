import { XCircle } from 'lucide-react';

export const CanceledPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="mt-3 text-xl font-bold text-gray-900">Payment Canceled</h2>
        <p className="mt-2 text-gray-600">
          Your payment was canceled. No charges have been made to your account.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};
