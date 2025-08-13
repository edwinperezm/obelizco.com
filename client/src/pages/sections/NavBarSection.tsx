interface NavBarSectionProps {
  onCheckoutClick: (e: React.MouseEvent) => Promise<void>;
  isLoading: boolean;
}

export const NavBarSection = ({ onCheckoutClick, isLoading }: NavBarSectionProps) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-[1080px] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/Logo Container-original.svg" alt="Obeliz.co" className="h-8" />
        </div>
        <button 
          onClick={onCheckoutClick}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-b from-[#f97316] to-[#e65002] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {isLoading ? 'Procesando...' : 'Comprar Ahora'}
        </button>
      </div>
    </nav>
  );
};
