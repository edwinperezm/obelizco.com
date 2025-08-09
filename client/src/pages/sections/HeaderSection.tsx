import { CheckIcon } from "lucide-react";
import placeholder_svg_fill from "@assets/placeholder.svg fill.png";
import placeholder_svg_fill2 from "@assets/placeholder.svg fill2.png";
import placeholder_svg_fill3 from "@assets/placeholder.svg fill3.png";
import placeholder_svg_fill4 from "@assets/placeholder.svg fill4.png";

import showroom_section from "@assets/showroom_section.webp";

export const HeaderSection = (): JSX.Element => {
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
        "Diseño hermoso y funcional optimizado para imprimir en casa con calidad profesional",
      imagePosition: "left",
    },
    {
      title: "Descarga inmediata",
      description:
        "Descarga el contenido, sin\nsuscripciones ni pagos adicionales",
      imagePosition: "left",
    },
  ];

  // Group features into pairs for layout
  const featurePairs = [
    [features[0], features[1]],
    [features[2], features[3]],
    [features[4], features[5]],
    [features[6], features[7]],
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-[60px] p-20 bg-[linear-gradient(116deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 max-w-[1080px] w-full">
        <div className="flex items-start justify-center gap-1">
          <h1 className="text-[#00242c] w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-7xl text-center tracking-[0] leading-[72px] whitespace-nowrap">
            Qué Incluye el
          </h1>
          <div className="relative pt-0 pb-1.5 px-0">
            <h1 className="text-[#e54f01] w-fit mt-[-1.00px] [font-family:'DM_Serif_Display',Helvetica] font-normal text-7xl text-center tracking-[0] leading-[72px] whitespace-nowrap">
              Journal
            </h1>
            <div className="absolute w-60 h-2.5 top-[74px] left-0 bg-orange-200 rounded-full opacity-50" />
          </div>
        </div>

        <p className="w-[600px] [font-family:'Geist',Helvetica] font-light text-[#00242c] text-[22px] text-center tracking-[0] leading-[30.8px]">
          Todo lo que necesitas saber para transformar <br />
          tu educación en casa
        </p>
      </div>
      {/* Features */}
      <div className="flex flex-col max-w-[1080px] w-full gap-[60px]">
        {featurePairs.map((pair, pairIndex) => {
          // For each pair, determine if we need to render one or two features
          const featuresToRender = pair.filter(Boolean);

          return (
            <div
              key={`feature-pair-${pairIndex}`}
              className="flex items-center justify-center gap-20 w-full"
            >
              {pairIndex % 2 === 0 ? (
                <>
                  {/* Image on the left for even pairs */}
                  <div className="relative w-[500px] h-[300px] rounded-[20px] overflow-hidden shadow-lg">
                    <img
                      src={featureImages[pairIndex]}
                      alt={`Feature illustration for ${featuresToRender[0]?.title}`}
                      className="w-full h-full object-cover"
                      data-testid={`feature-image-left-${pairIndex}`}
                    />
                  </div>

                  {/* Features on the right */}
                  <div className="flex flex-col items-start gap-8 flex-1">
                    {featuresToRender.map((feature, index) => (
                      <div
                        key={`feature-${pairIndex}-${index}`}
                        className="flex items-start gap-2.5 w-full"
                      >
                        <CheckIcon className="w-7 h-7 text-[#00242c]" />
                        <div className="flex flex-col items-start gap-2 flex-1">
                          <h3 className="w-full mt-[-1.00px] [font-family:'Geist',Helvetica] font-bold text-[#00242c] text-lg tracking-[0] leading-7">
                            {feature.title}
                          </h3>
                          <p className="w-full [font-family:'Geist',Helvetica] font-light text-[#00242c] text-base tracking-[0] leading-6">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Features on the left */}
                  <div className="flex flex-col items-start gap-8 flex-1">
                    {featuresToRender.map((feature, index) => (
                      <div
                        key={`feature-${pairIndex}-${index}`}
                        className="flex items-start gap-2.5 w-full"
                      >
                        <CheckIcon className="w-7 h-7 text-[#00242c]" />
                        <div className="flex flex-col items-start gap-2 flex-1">
                          <h3 className="w-full mt-[-1.00px] [font-family:'Geist',Helvetica] font-bold text-[#00242c] text-lg tracking-[0] leading-7">
                            {feature.title}
                          </h3>
                          <p className="w-full [font-family:'Geist',Helvetica] font-light text-[#00242c] text-base tracking-[0] leading-6">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Image on the right for odd pairs */}
                  <div className="relative w-[500px] h-[300px] rounded-[20px] overflow-hidden shadow-lg">
                    <img
                      src={featureImages[pairIndex]}
                      alt={`Feature illustration for ${featuresToRender[0]?.title}`}
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
      {/* Testimonials section */}
      <div className="relative w-[1080px] h-auto rounded-[40px] overflow-hidden shadow-lg">
        <img
          src={showroom_section}
          alt="Testimonials section"
          className="w-full h-auto object-cover"
          data-testid="testimonials-image"
        />
      </div>
    </section>
  );
};
