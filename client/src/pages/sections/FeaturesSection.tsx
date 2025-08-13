import { CreditCardIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import papaEducandoImg from "@attached_assets/Papa_educando.jpg";
import { handleCheckout, PRODUCTS } from "@/utils/checkout";
import { useState } from "react";

export const FeaturesSection = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckoutClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await handleCheckout(PRODUCTS.journal.name, PRODUCTS.journal.price, PRODUCTS.journal.currency);
    } catch (err) {
      setError('No se pudo iniciar el pago. Por favor intenta de nuevo.');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="p-[50px] bg-white overflow-hidden flex flex-col items-center justify-end gap-2.5 w-full">
      <Card className="w-full rounded-[40px] bg-gradient-to-b from-[#f97316] to-[#e65002] border-none shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-10 py-20 px-0 relative">
          {/* Background image with 20% opacity */}
          <div
            className="absolute inset-0 rounded-[40px] bg-image-overlay"
            style={{
              backgroundImage: `url(${papaEducandoImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Gradient overlay to maintain the original colors */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f97316] to-[#e65002] rounded-[40px] blend-hue" />

          {/* Content wrapper to ensure content is above overlays */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-10 w-full">
            <div className="flex flex-col max-w-[1080px] items-center justify-center gap-10 w-full">
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-center gap-2.5">
                  <div className="relative py-[8.75px] px-0">
                    <div className="absolute w-[469px] h-2 top-[62px] left-0 bg-[#f7933199] rounded-full" />
                    <h2 className="relative mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-white text-5xl text-center leading-[48px] whitespace-nowrap">
                      Transforma tu mirada
                    </h2>
                  </div>
                  <h2 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-white text-5xl text-center leading-[48px] whitespace-nowrap">
                    con el
                  </h2>
                </div>
                <h2 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-white text-5xl text-center leading-[48px] whitespace-nowrap">
                  Journal de 21 Días de Desescolarización
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Button 
                className="h-14 px-8 py-4 rounded-full border-b-2 [border-bottom-style:solid] border-[#cdcdcd] shadow-[10px_10px_20px_#0000001a] bg-gradient-to-b from-white to-[#dedede] hover:from-white hover:to-[#d0d0d0]"
                onClick={handleCheckoutClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#e54f01]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="[font-family:'Instrument_Sans',Helvetica] font-semibold text-[#e54f01] text-lg text-center leading-7 whitespace-nowrap">
                      Procesando...
                    </span>
                  </div>
                ) : (
                  <div className="[font-family:'Instrument_Sans',Helvetica] font-semibold text-[#e54f01] text-lg text-center leading-7 whitespace-nowrap">
                    Obtener Journal
                  </div>
                )}
              </Button>
              {error && <p className="text-sm text-red-600 mt-2 text-center">{error}</p>}
            </div>

            <div className="flex items-start px-5 py-2 bg-[#ffffff33] rounded-[100px] gap-2.5">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2.5">
                  <DownloadIcon className="w-3 h-3 text-white" />
                  <div className="flex flex-col items-start">
                    <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-light text-white text-sm leading-5 whitespace-nowrap">
                      Descarga inmediata
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <CreditCardIcon className="w-[13.33px] h-[13.33px] text-white" />
                  <div className="flex flex-col items-start">
                    <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-light text-white text-sm leading-5 whitespace-nowrap">
                      Pago&nbsp;&nbsp;único
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
