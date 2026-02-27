import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const verticalTextLeftRef = useRef<HTMLDivElement>(null);
  const verticalTextRightRef = useRef<HTMLDivElement>(null);
  const carImageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];
    const ctx = gsap.context(() => {
      gsap.fromTo(verticalTextLeftRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5, delay: 0.5, ease: 'power3.out' });
      gsap.fromTo(verticalTextRightRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5, delay: 0.7, ease: 'power3.out' });
      gsap.fromTo(titleRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' });

      gsap.to(carImageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true, onEnter: (self) => triggers.push(self) },
      });

      gsap.to(section.querySelector('.hero-content'), {
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: '50% top', scrub: true, onEnter: (self) => triggers.push(self) },
      });
    }, section);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="inicio" className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 3}s` }} />
        ))}
      </div>

      <div ref={verticalTextLeftRef} className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <div className="text-xs tracking-[0.3em] text-white/40 uppercase font-light" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Somos pasion
        </div>
      </div>

      <div ref={verticalTextRightRef} className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <div className="text-xs tracking-[0.3em] text-white/40 uppercase font-light" style={{ writingMode: 'vertical-rl' }}>
          Somos excelencia
        </div>
      </div>

      <div className="hero-content relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <p className="text-white/60 text-sm tracking-[0.4em] uppercase mb-6">Joselo Automotores</p>
        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-8">
          <span className="block">Tu libertad</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">sobre ruedas</span>
        </h1>
        <p ref={subtitleRef} className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Cada vehiculo esta seleccionado para tu estilo de vida, confort y ambiciones. Nosotros nos encargamos de todo para que solo disfrutes el camino.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => scrollToSection('catalogo')} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25">
            Ver Catalogo
          </Button>
          <Button onClick={() => scrollToSection('contacto')} variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full transition-all duration-300">
            <Phone className="w-5 h-5 mr-2" />
            Contactar
          </Button>
        </div>
      </div>

      <div ref={carImageRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 pointer-events-none" style={{ transform: `translate(-50%, ${mousePosition.y * 0.5}px)` }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent blur-3xl" />
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200" alt="Luxury Car" className="w-full h-auto object-contain opacity-60 mix-blend-luminosity" style={{ transform: `translateX(${mousePosition.x * 0.3}px)`, transition: 'transform 0.3s ease-out' }} />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button onClick={() => scrollToSection('nosotros')} className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors group">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <a href="https://wa.me/5493624406228" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-6 h-6 text-white" />
        </a>
        <a href="tel:+5493624406228" className="w-14 h-14 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-110">
          <Phone className="w-6 h-6 text-black" />
        </a>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </section>
  );
}