import { MouseEvent } from 'react';

export interface SectionProps {
  onCheckoutClick: (e: MouseEvent) => Promise<void>;
  isLoading: boolean;
}

// Declare module types for each section component
declare module './sections/JournalSection' {
  const JournalSection: React.FC<SectionProps>;
  export default JournalSection;
}

declare module './sections/CallToActionSection' {
  const CallToActionSection: React.FC<SectionProps>;
  export default CallToActionSection;
}

// For sections that don't need props
declare module './sections/FeaturesSection' {
  const FeaturesSection: React.FC;
  export default FeaturesSection;
}

declare module './sections/HeaderSection' {
  const HeaderSection: React.FC;
  export default HeaderSection;
}

declare module './sections/SubscriptionSection' {
  const SubscriptionSection: React.FC;
  export default SubscriptionSection;
}