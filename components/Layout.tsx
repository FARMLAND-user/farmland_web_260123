import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Share2 } from 'lucide-react';
import { NavItem, SiteConfig } from '../types';
import { TermsModal, PrivacyModal } from './LegalModals';
import { motion, useScroll, useSpring } from 'framer-motion';

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

const Logo = ({ isDark = false, showCEO = false }: { isDark?: boolean; showCEO?: boolean }) => (
  <div className="flex flex-col items-start select-none">
    <span className={`text-2xl font-black tracking-tighter leading-none mb-1 ${isDark ? 'text-white' : 'text-[#2F3E1B]'}`}>FARMLAND</span>
    <span className={`text-[11px] font-medium tracking-tighter leading-none ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>농업회사법인 주식회사 팜랜드</span>
    {showCEO && (
      <span className={`text-[11px] font-medium tracking-tighter leading-none mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>대표 김진근</span>
    )}
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children, config, onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  
  // Secret admin access state
  const [adminClickCount, setAdminClickCount] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(href.substring(1));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      onNavigate('admin');
    }
    setIsMobileMenuOpen(false);
  };

  // Secret function to enter admin mode
  const handleSecretAdmin = () => {
    setAdminClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        onNavigate('admin');
        return 0;
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" style={{ scaleX }} />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-white/90 py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => handleNavClick('#home')}>
            <div className="flex items-center gap-1.5 select-none">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8H36" stroke="#2F3E1B" strokeWidth="5" strokeLinecap="square"/>
                  <path d="M12 8V40" stroke="#2F3E1B" strokeWidth="5" strokeLinecap="square"/>
                  <path d="M12 24H30" stroke="#2F3E1B" strokeWidth="5" strokeLinecap="square"/>
                  <path d="M36 8C36 8 36 18 26 18C26 18 30 14 36 8Z" fill="#6B8E23"/>
                  <path d="M6 24C6 24 0 18 10 14C10 14 8 20 6 24Z" fill="#6B8E23"/>
                </svg>
              </div>
              <Logo />
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <button key={item.label} onClick={() => handleNavClick(item.href)} className="text-[15px] font-bold hover:text-primary transition-colors">{item.label}</button>
            ))}
          </nav>
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-6 animate-fade-in-up md:hidden">
          <div className="flex justify-between items-center mb-12">
            <Logo />
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
          </div>
          <nav className="flex flex-col space-y-6 text-center">
            {NAV_ITEMS.map((item) => (
              <button key={item.label} onClick={() => handleNavClick(item.href)} className="text-2xl font-bold">{item.label}</button>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-grow pt-[80px]">{children}</main>

      <footer className="bg-[#222] text-white pt-20 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            {/* Column 1: Brand */}
            <div>
              <div className="mb-8">
                <Logo isDark={true} showCEO={true} />
              </div>
              <div className="text-gray-400 text-[14px] font-light leading-[1.8] space-y-1">
                <p>자연의 정직함과</p>
                <p>첨단 기술의 조화로</p>
                <p>최상의 가치를 전달합니다.</p>
              </div>
            </div>
            
            {/* Column 2: CONTACT */}
            <div>
              <h4 className="text-white text-[15px] font-black mb-8 uppercase tracking-widest">CONTACT</h4>
              <div className="text-gray-400 text-[14px] font-light space-y-3">
                <p>{config.address}</p>
                <p>Tel: {config.contactPhone}</p>
                <p>Email: {config.contactEmail}</p>
              </div>
            </div>

            {/* Column 3: BUSINESS */}
            <div>
              <h4 className="text-white text-[15px] font-black mb-8 uppercase tracking-widest">BUSINESS</h4>
              <div className="text-gray-400 text-[14px] font-light space-y-3">
                <p>프리미엄 농산물 유통</p>
                <p>신선 전처리 공정</p>
                <p>스마트팜 솔루션</p>
                <p>계약 재배 및 컨설팅</p>
              </div>
            </div>

            {/* Column 4: SOCIAL */}
            <div>
              <h4 className="text-white text-[15px] font-black mb-8 uppercase tracking-widest">SOCIAL</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-primary transition-colors border border-zinc-700/50">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-primary transition-colors border border-zinc-700/50">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-primary transition-colors border border-zinc-700/50">
                  <Share2 size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-gray-500 font-light">
            <p 
              className="cursor-default select-none hover:text-gray-400 transition-colors" 
              onClick={handleSecretAdmin}
            >
              &copy; {new Date().getFullYear()} {config.companyName}. All Rights Reserved.
            </p>
            <div className="flex gap-8">
               <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors">이용약관</button>
               <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors">개인정보처리방침</button>
            </div>
          </div>
        </div>
      </footer>
      
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} config={config} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} config={config} />
    </div>
  );
};