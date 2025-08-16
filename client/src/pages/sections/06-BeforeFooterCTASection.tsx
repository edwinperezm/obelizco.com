import { CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ctaBackground from "@attached_assets/21-Días-de-Desescolarización-1Page.webp";

interface BeforeFooterCTASectionProps {
  onCheckoutClick: (e: React.MouseEvent) => Promise<void>;
  isLoading: boolean;
}

export const BeforeFooterCTASection = ({ onCheckoutClick, isLoading }: BeforeFooterCTASectionProps) => {
  return (
    <section className="w-full py-8 px-4 sm:pt-12 md:pt-16 sm:pb-12 md:pb-16 bg-white">
      <div className="w-full px-4 sm:px-8 md:px-[50px]">
        <div 
          className="relative w-full rounded-[20px] bg-gradient-to-b from-[#f97316] to-[#e65002] overflow-hidden"
          style={{
            backgroundImage: `url(${ctaBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f97316]/90 to-[#e65002]/90"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col max-w-[1080px] mx-auto items-center justify-center text-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
            {/* Title */}
            <h2 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 sm:mb-4">
              ¿Listo para transformar tu educación en casa?
            </h2>
            
            {/* Subheading */}
            <p className="[font-family:'Geist',Helvetica] font-light text-white text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-[600px] px-4">
              Únete a miles de familias que ya están viviendo una experiencia educativa auténtica y centrada en Cristo.
            </p>
            
            {/* CTA Button */}
            <Button
              onClick={onCheckoutClick}
              disabled={isLoading}
              className="h-12 sm:h-14 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-[#e65002] font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto max-w-[280px] sm:max-w-none"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#e65002]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Comprar Ahora - $15 USD</span>
                  <span className="xs:hidden">Comprar - $15</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
