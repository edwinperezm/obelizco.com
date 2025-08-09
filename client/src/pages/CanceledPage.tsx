import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export const CanceledPage = () => {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Payment Canceled
          </h1>
          <p className="mt-2 text-gray-600">
            Your payment was not completed. You have not been charged.
          </p>
          
          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-500">
              Changed your mind? You can complete your purchase at any time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Return to Home
              </Button>
              <Button
                onClick={() => window.history.back()}
                className="w-full sm:w-auto bg-[#009496] hover:bg-[#007a7a]"
              >
                Try Again
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help?{' '}
                <a 
                  href="mailto:support@obelizco.com" 
                  className="font-medium text-[#009496] hover:text-[#007a7a]"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanceledPage;
