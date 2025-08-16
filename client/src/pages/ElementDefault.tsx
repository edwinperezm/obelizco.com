import React from 'react';
import { NavBarSection } from './sections/01-NavBarSection';
import { HeroSection } from './sections/02-HeroSection';
import { ContentSection } from './sections/03-ContentSection';
import { ImageSection } from './sections/04-ImageSection';
import { NewsletterSection } from './sections/05-NewsletterSection';
import { BeforeFooterCTASection } from './sections/06-BeforeFooterCTASection';
import { FooterSection } from './sections/07-FooterSection';
import { handleCheckout, PRODUCTS } from '../utils/checkout';
import { Alert, AlertDescription } from '../components/ui/alert';

export const ElementDefault: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleCheckoutClick = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await handleCheckout(
        PRODUCTS.journal.name,
        PRODUCTS.journal.price,
        PRODUCTS.journal.currency
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during checkout';
      setError(errorMessage);
      console.error('Checkout error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <NavBarSection
        onCheckoutClick={handleCheckoutClick}
        isLoading={isLoading}
      />

      <main className="flex-1">
        {/* Hero Section - Carousel on left, H1-subheading, and main CTA */}
        <HeroSection
          onCheckoutClick={handleCheckoutClick}
          isLoading={isLoading}
        />
        
        {/* Content Section - Side-to-side images */}
        <ContentSection
          onCheckoutClick={handleCheckoutClick}
          isLoading={isLoading}
        />
        
        {/* Image Section - Only has an image */}
        <ImageSection />
        
        {/* Newsletter Section */}
        <NewsletterSection
          onCheckoutClick={handleCheckoutClick}
          isLoading={isLoading}
        />
        
        {/* Before Footer CTA Section */}
        <BeforeFooterCTASection
          onCheckoutClick={handleCheckoutClick}
          isLoading={isLoading}
        />
        
        {/* Footer Section */}
        <FooterSection />
      </main>

      {error && (
        <div className="fixed bottom-4 right-4 max-w-md">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ElementDefault;
