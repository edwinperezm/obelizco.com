import React from "react";
import { Separator } from "@/components/ui/separator";

export const SubscriptionSection = (): JSX.Element => {
  // Footer links data
  const productLinks = [
    { title: "Qué Incluye", href: "#" },
    { title: "Experiencia", href: "#" },
  ];

  return (
    <footer className="bg-[#00232c] py-16 w-full">
      <div className="flex flex-col max-w-[1080px] mx-auto gap-8 w-full px-4">
        <div className="flex items-start gap-20 w-full">
          {/* Logo and description */}
          <div className="flex flex-col items-start gap-[22.5px] flex-1">
            <img 
              src="/images/Footer Logo Container-white.svg" 
              alt="Obelizco Logo" 
              className="h-8 w-auto"
            />
            <p className="w-full max-w-[380.78px] font-['Geist',Helvetica] font-light text-gray-400 text-base leading-[26px]">
              Educación cristocéntrica en el hogar. Transformando familias a
              través de la fe y el aprendizaje.
            </p>
          </div>

          {/* Product links section */}
          <div className="flex flex-col w-[200px] items-start gap-4">
            <div className="w-full">
              <h3 className="font-['Inter',Helvetica] font-normal text-white text-base leading-6">
                Producto
              </h3>
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              {productLinks.map((link, index) => (
                <div key={index} className="w-full">
                  <a href={link.href} className="inline-flex items-center">
                    <span className="font-['Geist',Helvetica] font-light text-gray-400 text-base leading-6">
                      {link.title}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="w-full pt-[33px]">
          <Separator className="bg-[#004353] mb-8" />
          <div className="flex justify-center">
            <p className="font-['Geist',Helvetica] font-light text-gray-400 text-sm text-center leading-5">
              © 2024 obe&amp;liz.co - Educación cristocéntrica en el hogar.
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
