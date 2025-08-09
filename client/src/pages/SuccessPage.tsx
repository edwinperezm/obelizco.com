import { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Utility function to format currency
const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

interface StripeSession {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_details?: {
    email?: string;
    name?: string;
  };
  payment_intent?: string;
  created: number;
}

export const SuccessPage = () => {
  const [location, navigate] = useLocation();
  const [session, setSession] = useState<StripeSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setError('No se encontró un ID de sesión en la URL. Por favor, verifica el enlace o contacta al soporte.');
      setLoading(false);
      return;
    }

    const verifySession = async () => {
      try {
        // In production, verify the session with your backend
        const response = await fetch(`/api/payments/verify-session?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('No se pudo verificar la sesión de pago');
        }
        
        const data = await response.json();
        setSession(data.session);
      } catch (err) {
        console.error('Error verifying session:', err);
        setError('No se pudo verificar el pago. Tu orden ha sido registrada, pero por favor guarda este número de referencia: ' + sessionId);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [location]);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009496] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-2xl mx-auto">
        <div className="bg-red-100 p-4 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">¡Ups! Algo salió mal</h1>
        <p className="text-gray-600 mb-6 text-center">{error}</p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Por favor guarda este número de referencia: <span className="font-mono font-bold">{session?.id || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button onClick={() => navigate('/')} className="w-full sm:w-auto">
            Volver al inicio
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <a href="mailto:soporte@obelizco.com?subject=Problema con el pago">
              Contactar soporte
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white pb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">¡Pago Completado!</CardTitle>
            <CardDescription className="text-orange-100 text-center">
              Gracias por tu compra
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Hemos enviado los detalles de tu compra a{' '}
                  <span className="font-medium text-gray-900">
                    {session?.customer_details?.email || 'tu correo electrónico'}
                  </span>
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen del pedido</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número de pedido:</span>
                    <span className="font-mono text-sm">{session?.id || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-medium">
                      {session?.created ? formatDate(session.created) : 'Hoy'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                    <span className="text-lg font-bold">Total pagado:</span>
                    <span className="text-lg font-bold text-orange-600">
                      ${session?.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">¿Qué sigue?</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Recibirás un correo electrónico con los detalles de tu compra y las instrucciones para acceder a tu producto.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="w-full" asChild>
                  <Link href="/">
                    Volver al inicio
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:soporte@obelizco.com?subject=Consulta sobre mi pedido">
                    Contactar soporte
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;
