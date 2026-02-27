import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Catalogo', href: '#catalogo' },
  { label: 'Sucursales', href: '#sucursales' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }} className="flex items-center gap-3 group">
              <img src="/logo-joselo.png" alt="Joselo Automotores" className="h-10 w-auto object-contain" />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeSection === link.href.substring(1) ? 'text-amber-400' : 'text-white/70 hover:text-white'}`}>
                  {link.label}
                  {activeSection === link.href.substring(1) && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+5493624406228" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+54 9 3624 406228</span>
              </a>
              <Button onClick={() => scrollToSection('#catalogo')} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold px-6">
                Ver catalogo
              </Button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-20 left-0 right-0 bg-[#0a0a0a] border-b border-white/10 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${activeSection === link.href.substring(1) ? 'bg-amber-500/20 text-amber-400' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a href="tel:+5493624406228" className="flex items-center gap-3 px-4 py-3 text-white/70">
                <Phone className="w-5 h-5 text-amber-500" />
                +54 9 3624 406228
              </a>
              <Button onClick={() => scrollToSection('#catalogo')} className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold py-6">
                Ver catalogo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}