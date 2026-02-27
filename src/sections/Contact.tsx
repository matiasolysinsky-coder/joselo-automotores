import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Phone, Mail, MapPin, MessageSquare, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', lastName: '', phone: '', email: '', message: '', preferredContact: 'whatsapp' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

      if (formRef.current) {
        gsap.fromTo(formRef.current, { opacity: 0, x: -50 }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 75%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
        });
      }

      const infoItems = infoRef.current?.querySelectorAll('.info-item');
      if (infoItems && infoItems.length > 0) {
        gsap.fromTo(infoItems, { opacity: 0, x: 50 }, {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 75%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
        });
      }
    }, section);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} id="contacto" className="relative min-h-screen w-full bg-[#0a0a0a] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span className="animate-item text-amber-500 text-sm tracking-[0.3em] uppercase font-medium block mb-4">Contacto</span>
          <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Estamos aqui para<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600"> ayudarte</span>
          </h2>
          <p className="animate-item text-white/60 text-lg max-w-2xl mx-auto">
            Completa el formulario y un asesor se pondra en contacto contigo a la brevedad para ayudarte a encontrar tu vehiculo ideal.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-500" /></div>
                <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje enviado!</h3>
                <p className="text-white/60 mb-6">Gracias por contactarnos. Un asesor se comunicara contigo pronto.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="border-white/20 text-white hover:bg-white/10">Enviar otro mensaje</Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block flex items-center gap-2"><User className="w-4 h-4 text-amber-500" />Nombre</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500 focus:outline-none transition-colors" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Apellido</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500 focus:outline-none transition-colors" placeholder="Tu apellido" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" />Telefono</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500 focus:outline-none transition-colors" placeholder="+54 9 3624 406228" />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500" />Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500 focus:outline-none transition-colors" placeholder="tu@email.com" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-white/70 text-sm mb-2 block flex items-center gap-2"><MessageSquare className="w-4 h-4 text-amber-500" />Mensaje</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-500 focus:outline-none transition-colors resize-none" placeholder="Estoy interesado en..." />
                </div>

                <div className="mb-8">
                  <label className="text-white/70 text-sm mb-3 block">Preferencia de contacto</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.preferredContact === 'whatsapp' ? 'border-green-500 bg-green-500' : 'border-white/30'}`}>{formData.preferredContact === 'whatsapp' && <div className="w-2 h-2 bg-white rounded-full" />}</div>
                      <input type="radio" name="preferredContact" value="whatsapp" checked={formData.preferredContact === 'whatsapp'} onChange={handleChange} className="hidden" />
                      <span className={`text-sm transition-colors ${formData.preferredContact === 'whatsapp' ? 'text-green-500' : 'text-white/70 group-hover:text-white'}`}>WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.preferredContact === 'phone' ? 'border-amber-500 bg-amber-500' : 'border-white/30'}`}>{formData.preferredContact === 'phone' && <div className="w-2 h-2 bg-white rounded-full" />}</div>
                      <input type="radio" name="preferredContact" value="phone" checked={formData.preferredContact === 'phone'} onChange={handleChange} className="hidden" />
                      <span className={`text-sm transition-colors ${formData.preferredContact === 'phone' ? 'text-amber-500' : 'text-white/70 group-hover:text-white'}`}>Telefono</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.preferredContact === 'email' ? 'border-blue-500 bg-blue-500' : 'border-white/30'}`}>{formData.preferredContact === 'email' && <div className="w-2 h-2 bg-white rounded-full" />}</div>
                      <input type="radio" name="preferredContact" value="email" checked={formData.preferredContact === 'email'} onChange={handleChange} className="hidden" />
                      <span className={`text-sm transition-colors ${formData.preferredContact === 'email' ? 'text-blue-500' : 'text-white/70 group-hover:text-white'}`}>Email</span>
                    </label>
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold py-6 rounded-xl transition-all duration-300 disabled:opacity-50">
                  {loading ? (<span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Enviando...</span>) : (<span className="flex items-center gap-2"><Send className="w-5 h-5" />Enviar mensaje</span>)}
                </Button>
              </form>
            )}
          </div>

          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            <div className="info-item bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4"><Phone className="w-6 h-6 text-amber-500" /></div>
              <h3 className="text-white font-semibold mb-2">Telefono</h3>
              <a href="tel:+5493624406228" className="text-white/70 hover:text-amber-400 transition-colors block mb-1">+54 9 3624 406228</a>
            </div>

            <div className="info-item bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><MessageSquare className="w-6 h-6 text-green-500" /></div>
              <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
              <a href="https://wa.me/5493624406228" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-green-400 transition-colors">+54 9 3624 406228</a>
            </div>

            <div className="info-item bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4"><Mail className="w-6 h-6 text-blue-500" /></div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <a href="mailto:info@joseloautomotores.com" className="text-white/70 hover:text-blue-400 transition-colors block mb-1">info@joseloautomotores.com</a>
            </div>

            <div className="info-item bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4"><MapPin className="w-6 h-6 text-amber-500" /></div>
              <h3 className="text-white font-semibold mb-3">Nuestras sucursales</h3>
              <div className="mb-2"><p className="text-white font-medium text-sm">Sucursal Centro</p><p className="text-white/50 text-xs">Av. Corrientes 1234, Buenos Aires</p></div>
              <div><p className="text-white font-medium text-sm">Sucursal Norte</p><p className="text-white/50 text-xs">Av. del Libertador 5678, Vicente Lopez</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}