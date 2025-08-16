import { CheckIcon } from "lucide-react";
import placeholder_svg_fill from "@attached_assets/placeholder.svg-fill.png";
import placeholder_svg_fill2 from "@attached_assets/placeholder.svg-fill2.png";
import placeholder_svg_fill3 from "@attached_assets/placeholder.svg-fill3.png";
import placeholder_svg_fill4 from "@attached_assets/placeholder.svg-fill4.png";

export const ContentSection = (): JSX.Element => {
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
    <section className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-[60px] pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-8 md:px-20 bg-[linear-gradient(116deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full">
      <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-[1080px] w-full">
        <div className="flex flex-col-1 items-center justify-center gap-1">
          <h2 className="text-[#00242c] w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-[0] leading-tight">
            Qué Incluye el
          </h2>
          <div className="relative pt-0 pb-0 px-0">
            <h2 className="text-[#e54f01] w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-[0] leading-tight">
              Journal
            </h2>
            <div className="absolute w-full h-1.5 sm:h-2 top-[28px] sm:top-[30px] md:top-[36px] lg:top-[44px] left-0 bg-orange-200 rounded-full opacity-50"></div>
          </div>
        </div>
        <p className="max-w-[600px] w-full px-4 [font-family:'Geist',Helvetica] font-light text-[#00242c] text-lg sm:text-xl md:text-[22px] text-center tracking-[0] leading-relaxed">
          Todo lo que necesitas saber para transformar <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>tu educación en casa
        </p>
      </div>

      <div className="flex flex-col max-w-[1080px] w-full gap-8 sm:gap-12 md:gap-[60px]">
        {Array.from({ length: Math.ceil(features.length / 2) }, (_, pairIndex) => {
          const startIndex = pairIndex * 2;
          const pairFeatures = features.slice(startIndex, startIndex + 2);
          const imageForPair = featureImages[pairIndex];

          return (
            <div
              key={`pair-${pairIndex}`}
              className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-20 w-full"
            >
              {pairFeatures[0]?.imagePosition === "left" ? (
                <>
                  <div className="relative w-full max-w-[400px] sm:max-w-[450px] lg:max-w-[500px] h-[240px] sm:h-[270px] lg:h-[300px] rounded-[20px] overflow-hidden shadow-lg order-2 lg:order-1">
                    <img
                      src={imageForPair}
                      alt={`Feature illustration for ${pairFeatures[0]?.title}`}
                      className="w-full h-full object-cover"
                      data-testid={`feature-image-left-${pairIndex}`}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4 sm:gap-6 lg:gap-8 flex-1 order-1 lg:order-2">
                    {pairFeatures.map((feature, index) => (
                      <div
                        key={`${pairIndex}-${index}`}
                        className="flex flex-col items-start gap-2 sm:gap-4 text-center lg:text-left"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start w-full">
                          <CheckIcon className="w-5 sm:w-6 h-5 sm:h-6 text-[#009496] flex-shrink-0" />
                          <h3 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-[#00242c] text-xl sm:text-2xl tracking-[0] leading-tight">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="[font-family:'Geist',Helvetica] font-light text-[#00242c] text-base sm:text-lg tracking-[0] leading-relaxed lg:ml-9">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-start gap-4 sm:gap-6 lg:gap-8 flex-1 order-1 text-center lg:text-left">
                    {pairFeatures.map((feature, index) => (
                      <div
                        key={`${pairIndex}-${index}`}
                        className="flex flex-col items-start gap-2 sm:gap-4"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start w-full">
                          <CheckIcon className="w-5 sm:w-6 h-5 sm:h-6 text-[#009496] flex-shrink-0" />
                          <h3 className="[font-family:'DM_Serif_Display',Helvetica] font-normal text-[#00242c] text-xl sm:text-2xl tracking-[0] leading-tight">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="[font-family:'Geist',Helvetica] font-light text-[#00242c] text-base sm:text-lg tracking-[0] leading-relaxed lg:ml-9">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="relative w-full max-w-[400px] sm:max-w-[450px] lg:max-w-[500px] h-[240px] sm:h-[270px] lg:h-[300px] rounded-[20px] overflow-hidden shadow-lg order-2">
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
