import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Share2, Lock } from 'lucide-react';
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

const Logo = () => (
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
    <div className="flex flex-col justify-center">
      <span className="text-2xl font-black tracking-tight text-[#2F3E1B] leading-none mb-[2px]">FARMLAND</span>
      <span className="text-[11px] font-medium text-gray-600 tracking-tighter leading-none">농업회사법인 주식회사 팜랜드</span>
    </div>
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
          <div className="cursor-pointer" onClick={() => handleNavClick('#home')}><Logo /></div>
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

      <main className="flex-grow pt-[80px]">{children}</main>

      <footer className="bg-zinc-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-black mb-2">FARMLAND</h3>
              <p className="text-gray-400 text-sm font-light">자연의 정직함과<br />첨단 기술의 조화</p>
            </div>
            <div className="text-sm text-gray-400 space-y-2">
              <h4 className="text-white font-bold mb-4">CONTACT</h4>
              <p>{config.address}</p>
              <p>{config.contactPhone}</p>
              <p>{config.contactEmail}</p>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 flex justify-between items-center text-xs text-gray-500">
            <p 
              className="cursor-default select-none" 
              onClick={handleSecretAdmin}
              title="Only me"
            >
              &copy; {new Date().getFullYear()} {config.companyName}.
            </p>
            <div className="flex gap-4">
               <button onClick={() => setShowTerms(true)} className="hover:text-white">이용약관</button>
               <button onClick={() => setShowPrivacy(true)} className="hover:text-white">개인정보처리방침</button>
            </div>
          </div>
        </div>
      </footer>
      
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} config={config} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} config={config} />
    </div>
  );
};