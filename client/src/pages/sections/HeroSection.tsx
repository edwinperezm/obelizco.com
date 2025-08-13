import { useState, useEffect } from 'react';
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

// Product data with pricing
const productData = {
  title: 'Journal de 21 Días de Desescolarización',
  price: 15.00,
  description: 'Reconéctate con el aprendizaje auténtico, con una mirada reestructurada, acertiva y real.',
  features: [
    { icon: <CheckCircleIcon className="w-3 h-3 text-[#009496]" />, text: 'Descarga inmediata' },
    { icon: <CheckCircleIcon className="w-3 h-3 text-[#009496]" />, text: 'Pago único' },
  ]
};

// Product images for carousel
const productImages = [
  {
    id: 1,
    src: "/images/21-Días-de-Desescolarización-1Page.webp",
    alt: "21 Días de Desescolarización - Página 1"
  },
  {
    id: 2,
    src: "/images/21-Días-de-Desescolarización-2Page.webp",
    alt: "21 Días de Desescolarización - Página 2"
  },
  {
    id: 3,
    src: "/images/21-Días-de-Desescolarización-3Page.webp",
    alt: "21 Días de Desescolarización - Página 3"
  },
  {
    id: 4,
    src: "/images/21-Días-de-Desescolarización-4Page.webp",
    alt: "21 Días de Desescolarización - Página 4"
  },
  {
    id: 5,
    src: "/images/21-Días-de-Desescolarización-5Page.webp",
    alt: "21 Días de Desescolarización - Página 5"
  },
  {
    id: 6,
    src: "/images/21-Días-de-Desescolarización-6Page.webp",
    alt: "21 Días de Desescolarización - Página 6"
  }
];

interface HeroSectionProps {
  onCheckoutClick: (e: React.MouseEvent) => Promise<void>;
  isLoading: boolean;
}

export const HeroSection = ({ onCheckoutClick, isLoading }: HeroSectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState('');

  const handleCheckoutClickInternal = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    await onCheckoutClick(e);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#fff3ea] to-white z-10">
      <div className="w-full max-w-[1080px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Product Image Carousel */}
          <div className="flex-shrink-0 relative">
            <Carousel 
              setApi={setApi} 
              className="w-full max-w-[413.91px] h-[535.64px]"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {productImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <Card className="relative w-full h-[535.64px] rounded-[10px] overflow-hidden border-none">
                      <CardContent className="p-0 h-full">
                        <div className="relative w-full h-full">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={handleCheckoutClickInternal}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation Arrows */}
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {productImages.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
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
          <div className="flex-1 max-w-[586px]">
            {/* Title */}
            <h1 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-5xl md:text-6xl text-[#00242c] leading-tight mb-4">
              {productData.title}
            </h1>

            {/* Description */}
            <p className="[font-family:'Geist',Helvetica] font-light text-[#00242c] text-xl md:text-2xl leading-relaxed mb-8">
              {productData.description}
            </p>

            {/* Price and Buy Button */}
            <div className="flex items-center gap-8 mb-8">
              <Button
                onClick={handleCheckoutClickInternal}
                disabled={isLoading}
                className="h-14 px-8 py-4 rounded-full border-b-2 border-b-[#e54f01] shadow-[5px_5px_20px_#0000001a] bg-gradient-to-b from-[#f97316] to-[#e65002] hover:opacity-90 transition-opacity text-lg font-semibold text-white"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Comprar Ahora
                  </div>
                )}
              </Button>
              
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[60.66px] leading-none text-[#e54f01]">
                  ${productData.price.toFixed(0)}
                </span>
                <span className="text-lg text-[#00242c]">USD</span>
              </div>
            </div>

            {/* Features */}
            <div className="inline-flex items-center px-5 py-2 bg-[#edf7f5] rounded-[100px] gap-5">
              {productData.features.map((feature, index) => (
                <div
                  key={`feature-${index}`}
                  className="flex items-center gap-2"
                >
                  {feature.icon}
                  <span className="text-[#009496] text-sm leading-5">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
