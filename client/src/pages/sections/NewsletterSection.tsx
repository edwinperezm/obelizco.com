import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSectionProps {
  onCheckoutClick: (e: React.MouseEvent) => Promise<void>;
  isLoading: boolean;
}

export const NewsletterSection = ({ onCheckoutClick, isLoading }: NewsletterSectionProps) => {
  return (
    <section className="w-full pb-16 pt-16 bg-gradient-to-t from-[#fff3ea] to-white">
      <div className="w-full max-w-[1080px] mx-auto px-4">
        <div className="text-center">
          <h2 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-4xl md:text-5xl text-[#00242c] leading-tight mb-8">
            Mantente conectado
          </h2>
          <p className="[font-family:'Geist',Helvetica] font-light text-[#00242c] text-xl md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto">
            Recibe contenido exclusivo sobre educación en casa y recursos para transformar la experiencia de aprendizaje de tu familia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Tu correo electrónico"
              className="flex-1 h-14 px-6 text-lg border-2 border-gray-300 focus:border-[#f97316] rounded-full shadow-sm focus:shadow-md transition-all duration-200"
            />
            <Button 
              onClick={onCheckoutClick}
              disabled={isLoading}
              className="h-14 px-8 bg-gradient-to-b from-[#f97316] to-[#e65002] hover:from-[#e65002] hover:to-[#d44002] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <SendIcon className="w-5 h-5 mr-2" />
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
