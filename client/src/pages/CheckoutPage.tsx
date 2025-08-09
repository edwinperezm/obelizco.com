import { PaymentForm } from '@/components/PaymentForm';

export const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely with Stripe</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">21 Días de Desescolarización</span>
                <span className="font-medium">$15.00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">$15.00 USD</span>
              </div>
            </div>
          </div>
          
          <PaymentForm />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your payment is secure and encrypted.</p>
            <p className="mt-1">We use Stripe for secure payment processing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
