import { Car, Instagram, Facebook, Linkedin, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Catalogo', href: '#catalogo' },
    { label: 'Sucursales', href: '#sucursales' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Joselo Automotores</h3>
                <p className="text-white/50 text-sm">Pasion por los autos desde 2009</p>
              </div>
            </div>
            <p className="text-white/60 max-w-md mb-6 leading-relaxed">
              En Joselo Automotores nos dedicamos a ofrecer los mejores vehiculos con la mas alta calidad y servicio personalizado. Tu satisfaccion es nuestra prioridad.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 bg-white/5 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Enlaces rapidos</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-amber-500 transition-colors" />{link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li><a href="tel:+541112345678" className="text-white/60 hover:text-amber-400 transition-colors">+54 11 1234-5678</a></li>
              <li><a href="mailto:info@joseloautomotores.com" className="text-white/60 hover:text-amber-400 transition-colors">info@joseloautomotores.com</a></li>
              <li className="text-white/60"><p className="font-medium text-white/80">Sucursal Centro</p>Av. Corrientes 1234, CABA</li>
              <li className="text-white/60"><p className="font-medium text-white/80">Sucursal Norte</p>Av. del Libertador 5678, Vicente Lopez</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">© {currentYear} Joselo Automotores. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Politica de privacidad</a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Terminos y condiciones</a>
            </div>
          </div>
        </div>
      </div>

      <button onClick={scrollToTop} className="fixed bottom-8 left-8 w-12 h-12 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-110 z-50" aria-label="Volver arriba">
        <ArrowUp className="w-5 h-5 text-black" />
      </button>
    </footer>
  );
}