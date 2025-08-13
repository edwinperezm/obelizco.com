import { CheckIcon } from "lucide-react";
import placeholder_svg_fill from "@attached_assets/placeholder.svg-fill.png";
import placeholder_svg_fill2 from "@attached_assets/placeholder.svg-fill2.png";
import placeholder_svg_fill3 from "@attached_assets/placeholder.svg-fill3.png";
import placeholder_svg_fill4 from "@attached_assets/placeholder.svg-fill4.png";

interface ContentSectionProps {
  onCheckoutClick: (e: React.MouseEvent) => Promise<void>;
  isLoading: boolean;
}

export const ContentSection = ({ onCheckoutClick, isLoading }: ContentSectionProps): JSX.Element => {
  // Feature images for each section - all different using actual assets
  const featureImages = [
    placeholder_svg_fill, // For "21 Reflexiones Diarias" and "Verdades Bíblicas" (pairIndex 0)
    placeholder_svg_fill2, // For "Actividades Prácticas" and "Preguntas de Reflexión" (pairIndex 1)
    placeholder_svg_fill3, // For "Rutinas Espirituales" and "Guía de Implementación" (pairIndex 2)
    placeholder_svg_fill4, // For "Formato PDF Imprimible" and "Descarga inmediata" (pairIndex 3)
  ];

  // Feature data for mapping
  const features = [
    {
      title: "21 Reflexiones Diarias",
      description:
        "Meditaciones centradas en Cristo para fortalecer el vínculo con tu hijo y comenzar cada día con propósito y dirección espiritual.",
      imagePosition: "right",
    },
    {
      title: "Verdades Bíblicas",
      description:
        "Escrituras cuidadosamente seleccionadas para fortalecer la fe familiar y el crecimiento espiritual",
      imagePosition: "right",
    },
    {
      title: "Actividades Prácticas",
      description:
        "Ejercicios interactivos para aplicar las enseñanzas en la vida diaria de tu familia",
      imagePosition: "left",
    },
    {
      title: "Preguntas de Reflexión",
      description:
        "Para profundizar en la aplicación personal y familiar de cada enseñanza",
      imagePosition: "left",
    },
    {
      title: "Rutinas Espirituales",
      description:
        "Estructura clara para establecer hábitos cristianos duraderos en tu hogar",
      imagePosition: "right",
    },
    {
      title: "Guía de Implementación",
      description:
        "Instrucciones paso a paso para usar el jornal efectivamente desde el día uno",
      imagePosition: "right",
    },
    {
      title: "Formato PDF Imprimible",
      description:
        "Diseño optimizado para imprimir y usar físicamente con tu familia",
      imagePosition: "left",
    },
    {
      title: "Descarga inmediata",
      description:
        "Acceso instantáneo después de la compra para comenzar tu transformación hoy mismo",
      imagePosition: "left",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-[60px] p-20 bg-[linear-gradient(116deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full">
      <div className="flex flex-col items-center gap-6 max-w-[1080px] w-full">
        <div className="flex items-start justify-center gap-1">
          <h1 className="text-[#00242c] w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-7xl text-center tracking-[0] leading-[72px] whitespace-nowrap">
            Qué Incluye el
          </h1>
          <div className="relative pt-0 pb-1.5 px-0">
            <h1 className="text-[#e54f01] w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-7xl text-center tracking-[0] leading-[72px] whitespace-nowrap">
              Journal
            </h1>
            <div className="absolute w-60 h-2.5 top-[74px] left-0 bg-orange-200 rounded-full opacity-50"></div>
          </div>
        </div>
        <p className="w-[600px] [font-family:'Geist',Helvetica] font-light text-[#00242c] text-[22px] text-center tracking-[0] leading-[30.8px]">
          Todo lo que necesitas saber para transformar <br />
          tu educación en casa
        </p>
      </div>

      <div className="flex flex-col max-w-[1080px] w-full gap-[60px]">
        {Array.from({ length: Math.ceil(features.length / 2) }, (_, pairIndex) => {
          const startIndex = pairIndex * 2;
          const pairFeatures = features.slice(startIndex, startIndex + 2);
          const imageForPair = featureImages[pairIndex];

          return (
            <div
              key={`pair-${pairIndex}`}
              className="flex items-center justify-center gap-20 w-full"
            >
              {pairFeatures[0]?.imagePosition === "left" ? (
                <>
                  <div className="relative w-[500px] h-[300px] rounded-[20px] overflow-hidden shadow-lg">
                    <img
                      src={imageForPair}
                      alt={`Feature illustration for ${pairFeatures[0]?.title}`}
                      className="w-full h-full object-cover"
                      data-testid={`feature-image-left-${pairIndex}`}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-8 flex-1">
                    {pairFeatures.map((feature, index) => (
                      <div
                        key={`${pairIndex}-${index}`}
                        className="flex flex-col items-start gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <CheckIcon className="w-6 h-6 text-[#009496] flex-shrink-0" />
                          <h3 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-[#00242c] text-2xl tracking-[0] leading-[28.8px]">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="[font-family:'Geist',Helvetica] font-light text-[#00242c] text-lg tracking-[0] leading-[25.2px] ml-9">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-start gap-8 flex-1">
                    {pairFeatures.map((feature, index) => (
                      <div
                        key={`${pairIndex}-${index}`}
                        className="flex flex-col items-start gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <CheckIcon className="w-6 h-6 text-[#009496] flex-shrink-0" />
                          <h3 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-[#00242c] text-2xl tracking-[0] leading-[28.8px]">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="[font-family:'Geist',Helvetica] font-light text-[#00242c] text-lg tracking-[0] leading-[25.2px] ml-9">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="relative w-[500px] h-[300px] rounded-[20px] overflow-hidden shadow-lg">
                    <img
                      src={imageForPair}
                      alt={`Feature illustration for ${pairFeatures[0]?.title}`}
                      className="w-full h-full object-cover"
                      data-testid={`feature-image-right-${pairIndex}`}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
