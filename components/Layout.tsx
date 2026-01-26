import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Share2 } from 'lucide-react';
import { NavItem, SiteConfig } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  config: SiteConfig;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: '홈', href: '#home' },
  { label: '회사소개', href: '#about' },
  { label: '사업영역', href: '#business' },
  { label: '소식', href: '#news' },
  { label: '문의하기', href: '#contact' },
];

// Recreated SVG Logo based on the user's request
const Logo = () => (
  <div className="flex items-center gap-1.5 select-none">
    {/* Symbol */}
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
         {/* Main F structure */}
        <path d="M12 8H36" stroke="#2F3E1B" strokeWidth="5" strokeLinecap="square"/>
        <path d="M12 8V40" stroke="#2F3E1B" strokeWidth="5" strokeLinecap="square"/>
        <path d="M12 24H30" stroke="#2F3E1B" strokeWidth="5" strokeLinecap="square"/>
        
        {/* Leaf accents */}
        <path d="M36 8C36 8 36 18 26 18C26 18 30 14 36 8Z" fill="#6B8E23"/>
        <path d="M6 24C6 24 0 18 10 14C10 14 8 20 6 24Z" fill="#6B8E23"/>
      </svg>
    </div>
    
    {/* Text */}
    <div className="flex flex-col justify-center">
      <span className="text-2xl font-black tracking-tight text-[#2F3E1B] leading-none mb-[2px]">
        FARMLAND
      </span>
      <span className="text-[11px] font-medium text-gray-600 tracking-tighter leading-none">
        농업회사법인 주식회사 팜랜드
      </span>
    </div>
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children, config, onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    // If it's the admin link, we handle it externally, otherwise scroll
    if (href.startsWith('#')) {
      onNavigate(href.substring(1)); // remove #
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
        onNavigate('admin');
    }
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          // Force solid white background when mobile menu is open for better visibility
          isMobileMenuOpen 
            ? 'bg-white shadow-none' 
            : (isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-5 shadow-sm')
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative z-50">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => handleNavClick('#home')}
          >
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`text-[15px] font-bold tracking-tight transition-colors hover:text-primary ${
                  isScrolled ? 'text-gray-700' : 'text-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-gray-800 hover:text-primary transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col justify-center items-center`}
        >
          <div className="flex flex-col space-y-10 items-center w-full px-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-3xl font-black text-gray-900 hover:text-primary transition-colors tracking-tight w-full text-center py-2 active:scale-95 duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Footer Info */}
          <div className="absolute bottom-12 text-center">
            <p className="text-xs text-gray-400 font-medium tracking-wider uppercase mb-2">Farmland Co., Ltd.</p>
            <div className="flex gap-6 justify-center text-gray-400">
               <Instagram size={20} />
               <Facebook size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-[80px]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#2a2a2a] text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6 filter grayscale brightness-200 opacity-80">
                 {/* Reusing logo structure for footer but simplified/monochrome if needed, or just text */}
                 <h3 className="text-2xl font-black tracking-tight">FARMLAND</h3>
                 <p className="text-[10px] text-gray-400 font-normal">농업회사법인 주식회사 팜랜드</p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                자연의 정직함과<br />첨단 기술의 조화로<br />최상의 가치를 전달합니다.
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold mb-4 text-white text-sm tracking-wider">CONTACT</h4>
              <ul className="space-y-2 text-gray-400 text-sm font-light">
                <li>{config.address}</li>
                <li>Tel: {config.contactPhone}</li>
                <li>Email: {config.contactEmail}</li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold mb-4 text-white text-sm tracking-wider">BUSINESS</h4>
              <ul className="space-y-2 text-gray-400 text-sm font-light">
                <li>프리미엄 농산물 유통</li>
                <li>신선 전처리 공정</li>
                <li>농산물 공급/가공/유통</li>
                <li>계약 재배 및 컨설팅</li>
              </ul>
            </div>

             <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold mb-4 text-white text-sm tracking-wider">SOCIAL</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                  <Share2 size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-xs font-light">
            &copy; {new Date().getFullYear()} {config.companyName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};