import logo from "@attached_assets/Logo Container-original.svg";

interface NavBarSectionProps {
  onCheckoutClick: (e: React.MouseEvent) => Promise<void>;
  isLoading: boolean;
}

export const NavBarSection = ({ onCheckoutClick, isLoading }: NavBarSectionProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-4 py-3 sm:py-4">
      <div className="max-w-[1080px] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Obeliz.co" className="h-6 sm:h-8" />
        </div>
        <button 
          onClick={onCheckoutClick}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 rounded-full bg-gradient-to-b from-[#f97316] to-[#e65002] text-white font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {isLoading ? 'Procesando...' : (
            <>
              <span className="hidden xs:inline">Comprar Ahora</span>
              <span className="xs:hidden">Comprar</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};
