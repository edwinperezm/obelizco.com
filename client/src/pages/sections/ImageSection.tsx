import showroom_section from "@attached_assets/showroom_section.webp";

export const ImageSection = (): JSX.Element => {
  return (
    <section className="w-full pt-16 pb-16 bg-white">
      <div className="w-full max-w-[1080px] mx-auto px-4">
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
