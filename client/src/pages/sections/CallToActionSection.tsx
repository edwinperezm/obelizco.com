import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from '@/components/ui/carousel';

// Simple Link component for navigation
const Link = ({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Product data with pricing
const productData = {
  title: {
    firstPart: '21 Días',
    secondPart: {
      prefix: 'de',
      highlight: 'Desescolarización',
    },
  },
  description: 'Reconéctate con el aprendizaje auténtico, con una mirada reestructurada, acertiva y real.',
  price: {
    amount: '15',
    currency: 'USD',
  },
  features: [
    { icon: <CheckCircleIcon className="w-3 h-3 text-[#009496]" />, text: 'Descarga inmediata' },
    { icon: <CheckCircleIcon className="w-3 h-3 text-[#009496]" />, text: 'Pago único' },
    { icon: <CheckCircleIcon className="w-3 h-3 text-[#009496]" />, text: 'Acceso de por vida' },
  ],
  actions: [
    { label: 'Comprar ahora', icon: ArrowRightIcon },
  ],
};

export const CallToActionSection = (): JSX.Element => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Using one-time payment for $1
          productName: productData.title.firstPart + ' ' + productData.title.secondPart.highlight,
          amount: 100, // $1.00 in cents
          currency: 'usd',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned from server');
      }
      
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Product images for carousel
  const productImages = [
    {
      id: 1,
      src: "/images/21-Días-de-Desescolarización-1<Page.webp",
      alt: "21 Días de Desescolarización - Página 1"
    },
    {
      id: 2,
      src: "/images/21-Días-de-Desescolarización-2<Page.webp",
      alt: "21 Días de Desescolarización - Página 2"
    },
    {
      id: 3,
      src: "/images/21-Días-de-Desescolarización-4<Page.webp",
      alt: "21 Días de Desescolarización - Página 3"
    },
    {
      id: 4,
      src: "/images/21-Días-de-Desescolarización-5<Page.webp",
      alt: "21 Días de Desescolarización - Página 4"
    },
    {
      id: 5,
      src: "/images/21-Días-de-Desescolarización-6<Page.webp",
      alt: "21 Días de Desescolarización - Página 5"
    },
    {
      id: 6,
      src: "/images/21-Días-de-Desescolarización-7<Page.webp",
      alt: "21 Días de Desescolarización - Página 6"
    }
  ];

  // Product data
  const productData = {
    title: {
      firstPart: "Journal-21 Días",
      secondPart: {
        prefix: "de",
        highlight: "Desescolarización",
      },
    },
    description:
      "Reconéctate con el aprendizaje auténtico, con una mirada reestructurada, acertiva y real.",
    price: {
      amount: "$15",
      currency: "USD",
    },
    features: [
      {
        icon: <CheckCircleIcon className="w-3 h-3 text-[#009496]" />,
        text: "Descarga inmediata",
      },
      {
        icon: (
          <CheckCircleIcon className="w-[13.33px] h-[13.33px] text-[#009496]" />
        ),
        text: "Pago\u00A0\u00A0único",
      },
    ],
    actions: [
      { text: "Ver más", icon: <ArrowRightIcon className="w-6 h-6" /> },
      { text: "Experiencia", icon: <ArrowRightIcon className="w-6 h-6" /> },
    ],
  };

  return (
    <section className="flex flex-col items-center justify-center px-28 py-20 relative self-stretch w-full flex-[0_0_auto] overflow-hidden bg-[linear-gradient(180deg,rgba(255,243,234,1)_0%,rgba(255,255,255,1)_100%)]">
      <div className="flex w-[1080px] items-center justify-center gap-20 relative flex-[0_0_auto]">
        {/* Product Image Carousel */}
        <div className="inline-flex flex-col items-center justify-center gap-5 relative flex-[0_0_auto]">
          <Carousel 
            setApi={setApi} 
            className="w-[413.91px] h-[535.64px]"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {productImages.map((image) => (
                <CarouselItem key={image.id}>
                  <Card className="relative w-[413.91px] h-[535.64px] rounded-[10px] overflow-hidden shadow-[10px_10px_40px_#0000001a] border-none">
                    <CardContent className="p-0 h-full">
                      <div className="relative w-full h-full">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              className="left-2 bg-white/80 hover:bg-white shadow-lg border-gray-200"
              data-testid="carousel-prev-button"
            />
            <CarouselNext 
              className="right-2 bg-white/80 hover:bg-white shadow-lg border-gray-200"
              data-testid="carousel-next-button"
            />
          </Carousel>

          {/* Navigation Dots */}
          <div className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]">
            {productImages.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`relative w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  index === current - 1 ? 'bg-[#e54f01]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                data-testid={`carousel-dot-${index + 1}`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col w-[586px] items-start gap-[30px] pt-0 pb-8 px-0 relative">
          {/* Title */}
          <div className="inline-flex items-start pl-0 pr-2.5 py-2.5 flex-col relative flex-[0_0_auto]">
            <h1 className="relative w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-[#00242c] text-[62px] tracking-[0] leading-[62px] whitespace-nowrap">
              {productData.title.firstPart}
            </h1>

            <div className="inline-flex flex-col items-center justify-center gap-2.5 relative flex-[0_0_auto]">
              <div className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]">
                <span className="relative w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-[#00242c] text-[62px] tracking-[0] leading-[62px] whitespace-nowrap">
                  {productData.title.secondPart.prefix}
                </span>

                <span className="relative w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-[#e54f01] text-[62px] tracking-[0] leading-[62px] whitespace-nowrap">
                  {productData.title.secondPart.highlight}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="relative self-stretch [font-family:'Geist',Helvetica] font-normal text-[#00242c] text-[22px] tracking-[0] leading-[30.8px]">
            {productData.description}
          </p>

          {/* Price and Buy Button */}
          <div className="flex flex-col items-start self-stretch w-full gap-5 relative flex-[0_0_auto]">
            <div className="flex flex-col items-start justify-center gap-[30px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="h-14 px-8 py-4 rounded-full border-b-2 [border-bottom-style:solid] border-[#e54f01] shadow-[5px_5px_20px_#0000001a] bg-[linear-gradient(180deg,rgba(249,115,22,1)_0%,rgba(230,80,2,1)_100%)] [font-family:'Geist',Helvetica] font-semibold text-white text-lg hover:opacity-90 transition-opacity ml-0 md:ml-0"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-4 h-4 mr-2" />
                      Comprar Ahora
                    </>
                  )}
                </Button>
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              {/* Features */}
              <div className="inline-flex items-start px-5 py-2 bg-[#edf7f5] rounded-[100px] gap-5 relative flex-[0_0_auto]">
                {productData.features.map((feature, index) => (
                  <div
                    key={`feature-${index}`}
                    className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]"
                  >
                    {feature.icon}
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <span className="relative w-fit mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-[#009496] text-sm tracking-[0] leading-5 whitespace-nowrap">
                        {feature.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons removed as per request */}
        </div>

        {/* Navigation Arrows */}
        <div
          className="absolute w-[70px] h-[70px] top-[279px] left-[370px]"
          aria-label="Next button"
        />
        <div
          className="absolute w-[70px] h-[70px] top-[279px] left-[-33px]"
          aria-label="Previous button"
        />
      </div>
    </section>
  );
};
