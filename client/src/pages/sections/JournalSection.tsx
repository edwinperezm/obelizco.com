import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const JournalSection = (): JSX.Element => {
  return (
    <section className="py-20 bg-[linear-gradient(0deg,rgba(255,243,234,1)_0%,rgba(255,255,255,1)_100%)] flex flex-col items-center w-full">
      <div className="flex flex-col max-w-[1080px] items-center justify-center gap-[60px] w-full">
        <div className="flex items-center gap-[30px] self-stretch w-full flex-col">
          <div className="flex items-start justify-center gap-1">
            <h2 className="text-[#00242c] [font-family:'DM_Serif_Display',Helvetica] font-normal text-7xl text-center leading-[72px] whitespace-nowrap">
              Recibe alertas de
            </h2>

            <div className="relative pt-0 pb-1.5">
              <span className="text-[#e54f01] [font-family:'DM_Serif_Display',Helvetica] font-normal text-7xl text-center leading-[72px] whitespace-nowrap">
                nuevo material
              </span>
              <div className="absolute w-[481px] h-2.5 top-[74px] left-0 bg-orange-200 rounded-full opacity-50" />
            </div>
          </div>

          <p className="w-[600px] [font-family:'Geist',Helvetica] font-light text-[#00242c] text-[22px] text-center leading-[30.8px]">
            Subscribete con tu correo y recibe notificaciones cuando lancemos
            nuevos recursos geniales para tu familia.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex w-[832px] items-start gap-6">
            <Input
              className="flex-1 min-h-14 px-8 py-2.5 bg-white rounded-full border border-solid border-[#d7d7d7] [font-family:'Geist',Helvetica] font-light text-lg text-center"
              placeholder="Escribe tu mejor email"
            />

            <Button className="min-h-14 px-8 py-2.5 bg-orange-500 rounded-full [font-family:'Instrument_Sans',Helvetica] font-semibold text-white text-lg hover:bg-orange-600">
              <SendIcon className="w-[13.33px] h-[10.67px] mr-2.5" />
              Subscribete
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
