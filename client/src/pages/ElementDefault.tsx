import React from "react";
import { Button } from "@/components/ui/button";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HeaderSection } from "./sections/HeaderSection";
import { JournalSection } from "./sections/JournalSection";
import { SubscriptionSection } from "./sections/SubscriptionSection";
import { handleCheckout, PRODUCTS } from "@/utils/checkout";

export const ElementDefault = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start w-full bg-white">
      <header className="sticky top-0 z-50 flex flex-col items-center justify-center px-28 py-0 w-full bg-[#ffffffcc] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] shadow-sm">
        <div className="flex w-[1080px] h-20 items-center justify-between pl-0 pr-[0.01px] py-0">
          <div className="inline-flex items-center">
            <img 
              src="/images/Logo Container-original.svg" 
              alt="Obelizco Logo" 
              className="h-8 w-auto"
            />
          </div>

          <Button
            variant="default"
            className="bg-orange-500 rounded-full hover:bg-orange-600"
            onClick={() => handleCheckout(PRODUCTS.journal.name, PRODUCTS.journal.price, PRODUCTS.journal.currency)}
          >
            <span className="[font-family:'Geist',Helvetica] font-semibold text-white text-sm">
              Comprar Ahora
            </span>
          </Button>
        </div>
      </header>

      <CallToActionSection />
      <HeaderSection />
      <JournalSection />
      <FeaturesSection />
      <SubscriptionSection />
    </div>
  );
};
