import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Car, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Car, value: 500, suffix: '+', label: 'Vehiculos vendidos' },
  { icon: Users, value: 1200, suffix: '+', label: 'Clientes satisfechos' },
  { icon: Award, value: 15, suffix: '', label: 'Anos de experiencia' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Atencion personalizada' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];
    const ctx = gsap.context(() => {
      const contentElements = contentRef.current?.querySelectorAll('.animate-item');
      if (contentElements && contentElements.length > 0) {
        gsap.fromTo(contentElements, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
        });
      }

      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems && statItems.length > 0) {
        gsap.fromTo(statItems, { opacity: 0, y: 40, scale: 0.9 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
        });
      }

      statItems?.forEach((item) => {
        const valueEl = item.querySelector('.stat-value');
        const targetValue = parseInt(valueEl?.getAttribute('data-value') || '0');
        gsap.fromTo({ value: 0 }, { value: targetValue }, {
          duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
          onUpdate: function () { if (valueEl) valueEl.textContent = Math.round(this.targets()[0].value).toString(); },
        });
      });
    }, section);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="nosotros" className="relative min-h-screen w-full bg-[#0a0a0a] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="animate-item">
              <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-medium">Sobre Nosotros</span>
            </div>
            <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Pasion por los<span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">autos desde 2009</span>
            </h2>
            <div className="animate-item space-y-4 text-white/70 text-lg leading-relaxed">
              <p>En <strong className="text-white">Joselo Automotores</strong> creemos que comprar un auto es mas que una transaccion: es el inicio de una nueva aventura.</p>
              <p>Con mas de 15 anos de experiencia en el mercado automotriz, nos hemos convertido en referentes de confianza en Buenos Aires.</p>
            </div>
            <div className="animate-item flex flex-wrap gap-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center"><Award className="w-5 h-5 text-amber-500" /></div>
                <span className="text-sm">Garantia en todos los vehiculos</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center"><Users className="w-5 h-5 text-amber-500" /></div>
                <span className="text-sm">Atencion personalizada</span>
              </div>
            </div>
          </div>

          <div className="animate-item relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-3xl blur-2xl" />
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800" alt="Joselo Automotores Showroom" className="relative w-full h-full object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-white font-semibold">Showroom Principal</p>
                  <p className="text-white/60 text-sm">Av. Corrientes 1234, Buenos Aires</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl p-6 shadow-2xl shadow-amber-500/20">
              <p className="text-black font-bold text-3xl">15+</p>
              <p className="text-black/70 text-sm">Anos de experiencia</p>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center group-hover:from-amber-500 group-hover:to-yellow-600 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-amber-500 group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="stat-value text-3xl font-bold text-white" data-value={stat.value}>0</p>
                  <span className="text-amber-500 font-bold">{stat.suffix}</span>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}