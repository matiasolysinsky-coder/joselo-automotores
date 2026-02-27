import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Mail, Navigation } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Branch } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function Branches() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { branches } = useApp();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];
    const ctx = gsap.context(() => {
      const headerItems = headerRef.current?.querySelectorAll('.animate-item');
      if (headerItems && headerItems.length > 0) {
        gsap.fromTo(headerItems, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
        });
      }

      const branchCards = contentRef.current?.querySelectorAll('.branch-card');
      if (branchCards && branchCards.length > 0) {
        gsap.fromTo(branchCards, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
        });
      }
    }, section);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  const openMap = (branch: Branch) => {
    const url = `https://www.google.com/maps?q=${branch.latitude},${branch.longitude}`;
    window.open(url, '_blank');
  };

  const getDirections = (branch: Branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <section ref={sectionRef} id="sucursales" className="relative min-h-screen w-full bg-[#0a0a0a] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span className="animate-item text-amber-500 text-sm tracking-[0.3em] uppercase font-medium block mb-4">Nuestras Sucursales</span>
          <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Visitamos en<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600"> cualquiera de</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">nuestras ubicaciones</span>
          </h2>
          <p className="animate-item text-white/60 text-lg max-w-2xl mx-auto">
            Contamos con dos sucursales estrategicamente ubicadas para brindarte la mejor atencion y experiencia de compra.
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8">
          {branches.map((branch) => (
            <div key={branch.id} className="branch-card group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-500">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={branch.image} alt={branch.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <button onClick={() => openMap(branch)} className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-500 transition-all duration-300 group/btn">
                  <MapPin className="w-5 h-5 text-white group-hover/btn:text-black" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{branch.name}</h3>
                  <p className="text-white/70 flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" />{branch.address}, {branch.city}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center"><Phone className="w-4 h-4 text-amber-500" /></div>
                    <div><p className="text-white/50 text-xs">Telefono</p><a href={`tel:${branch.phone}`} className="text-white text-sm hover:text-amber-400 transition-colors">{branch.phone}</a></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center"><Mail className="w-4 h-4 text-amber-500" /></div>
                    <div><p className="text-white/50 text-xs">Email</p><a href={`mailto:${branch.email}`} className="text-white text-sm hover:text-amber-400 transition-colors">{branch.email}</a></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center"><Clock className="w-4 h-4 text-amber-500" /></div>
                  <div><p className="text-white/50 text-xs">Horario de atencion</p><p className="text-white text-sm">{branch.hours}</p></div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => getDirections(branch)} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold py-3 rounded-xl transition-all duration-300">
                    <Navigation className="w-4 h-4" />Como llegar
                  </button>
                  <a href={`tel:${branch.phone}`} className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"><Phone className="w-5 h-5 text-white" /></a>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/50 mb-4">¿No sabes que sucursal te queda mas cerca?</p>
          <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"><Phone className="w-5 h-5" />Consultanos por WhatsApp</a>
        </div>
      </div>
    </section>
  );
}