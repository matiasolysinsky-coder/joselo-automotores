import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car, Filter, X, Fuel, Settings, Phone, MessageSquare, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import type { Vehicle } from '@/types';
import { categories, brands } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function Catalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  const { filteredVehicles, filters, setFilters, formatPrice, sellers } = useApp();

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

      const cards = gridRef.current?.querySelectorAll('.vehicle-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%', toggleActions: 'play none none reverse', onEnter: (self) => triggers.push(self) },
        });
      }
    }, section);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, [filteredVehicles]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSellerInfo = (sellerId: string) => {
    return sellers.find(s => s.id === sellerId);
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.label || category;
  };

  return (
    <section ref={sectionRef} id="catalogo" className="relative min-h-screen w-full bg-[#0a0a0a] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="animate-item text-amber-500 text-sm tracking-[0.3em] uppercase font-medium block mb-4">Nuestro Catalogo</span>
              <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Encuentra tu<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600"> vehiculo ideal</span>
              </h2>
            </div>
            
            <div className="animate-item flex items-center gap-4">
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
                {Object.keys(filters).length > 0 && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center">{Object.keys(filters).length}</span>
                )}
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="animate-item mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Filtrar por:</h3>
                <button onClick={clearFilters} className="text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors">
                  <X className="w-4 h-4" />Limpiar filtros
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <select value={filters.category || ''} onChange={(e) => handleFilterChange('category', e.target.value || undefined)} className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none">
                  <option value="">Categoria</option>
                  {categories.map(cat => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
                </select>

                <select value={filters.brand || ''} onChange={(e) => handleFilterChange('brand', e.target.value || undefined)} className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none">
                  <option value="">Marca</option>
                  {brands.map(brand => (<option key={brand} value={brand}>{brand}</option>))}
                </select>

                <select value={filters.condition || ''} onChange={(e) => handleFilterChange('condition', e.target.value || undefined)} className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none">
                  <option value="">Condicion</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado">Usado</option>
                </select>

                <select value={filters.fuelType || ''} onChange={(e) => handleFilterChange('fuelType', e.target.value || undefined)} className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none">
                  <option value="">Combustible</option>
                  <option value="nafta">Nafta</option>
                  <option value="diesel">Diesel</option>
                  <option value="electrico">Electrico</option>
                  <option value="hibrido">Hibrido</option>
                </select>

                <select value={filters.transmission || ''} onChange={(e) => handleFilterChange('transmission', e.target.value || undefined)} className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none">
                  <option value="">Transmision</option>
                  <option value="manual">Manual</option>
                  <option value="automatico">Automatico</option>
                </select>

                <select value={filters.year || ''} onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : undefined)} className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:border-amber-500 focus:outline-none">
                  <option value="">Ano</option>
                  {[2024, 2023, 2022, 2021, 2020].map(year => (<option key={year} value={year}>{year}</option>))}
                </select>
              </div>
            </div>
          )}

          <p className="animate-item mt-4 text-white/50 text-sm">Mostrando {filteredVehicles.length} vehiculos</p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={vehicle.mainImage} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={`${vehicle.condition === 'nuevo' ? 'bg-green-500' : 'bg-amber-500'} text-black font-semibold`}>{vehicle.condition === 'nuevo' ? 'Nuevo' : 'Usado'}</Badge>
                  <Badge variant="outline" className="border-white/30 text-white">{getCategoryLabel(vehicle.category)}</Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-amber-500 text-black font-bold px-4 py-2 rounded-lg">{formatPrice(vehicle.price, vehicle.currency)}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-white/50 text-sm">{vehicle.year}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Settings className="w-4 h-4 text-amber-500" /><span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Fuel className="w-4 h-4 text-amber-500" /><span className="capitalize">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Settings className="w-4 h-4 text-amber-500" /><span className="capitalize">{vehicle.transmission}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setSelectedVehicle(vehicle)} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Eye className="w-4 h-4 mr-2" />Ver mas
                  </Button>
                  <Button onClick={() => { setSelectedVehicle(vehicle); setContactDialogOpen(true); }} className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold">
                    <Phone className="w-4 h-4 mr-2" />Contactar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-16">
            <Car className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No se encontraron vehiculos</h3>
            <p className="text-white/50">Intenta ajustar los filtros para ver mas opciones</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedVehicle && !contactDialogOpen} onOpenChange={() => setSelectedVehicle(null)}>
        <DialogContent className="max-w-4xl bg-[#111] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedVehicle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedVehicle.brand} {selectedVehicle.model}</DialogTitle>
              </DialogHeader>
              
              <div className="grid lg:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <img src={selectedVehicle.mainImage} alt={`${selectedVehicle.brand} ${selectedVehicle.model}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedVehicle.images.slice(1, 4).map((img, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden"><img src={img} alt="" className="w-full h-full object-cover" /></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={selectedVehicle.condition === 'nuevo' ? 'bg-green-500' : 'bg-amber-500'}>{selectedVehicle.condition === 'nuevo' ? 'Nuevo' : 'Usado'}</Badge>
                      <span className="text-white/50">{selectedVehicle.year}</span>
                    </div>
                    <p className="text-3xl font-bold text-amber-500">{formatPrice(selectedVehicle.price, selectedVehicle.currency)}</p>
                  </div>

                  <p className="text-white/70 leading-relaxed">{selectedVehicle.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-3"><p className="text-white/50 text-sm">Motor</p><p className="text-white font-medium">{selectedVehicle.engine}</p></div>
                    <div className="bg-white/5 rounded-lg p-3"><p className="text-white/50 text-sm">Potencia</p><p className="text-white font-medium">{selectedVehicle.power}</p></div>
                    <div className="bg-white/5 rounded-lg p-3"><p className="text-white/50 text-sm">Kilometraje</p><p className="text-white font-medium">{selectedVehicle.mileage.toLocaleString()} km</p></div>
                    <div className="bg-white/5 rounded-lg p-3"><p className="text-white/50 text-sm">Color</p><p className="text-white font-medium">{selectedVehicle.color}</p></div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">Caracteristicas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVehicle.features.map((feature, i) => (<span key={i} className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">{feature}</span>))}
                    </div>
                  </div>

                  {getSellerInfo(selectedVehicle.sellerId) && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-white/50 text-sm mb-2">Asesor asignado</p>
                      <div className="flex items-center gap-3">
                        <img src={getSellerInfo(selectedVehicle.sellerId)?.photo} alt="" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="text-white font-medium">{getSellerInfo(selectedVehicle.sellerId)?.name} {getSellerInfo(selectedVehicle.sellerId)?.lastName}</p>
                          <p className="text-white/50 text-sm">{getSellerInfo(selectedVehicle.sellerId)?.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button onClick={() => setContactDialogOpen(true)} className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold py-6">
                      <Phone className="w-5 h-5 mr-2" />Contactar asesor
                    </Button>
                    <a href={`https://wa.me/${getSellerInfo(selectedVehicle.sellerId)?.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-md bg-[#111] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Contactar por {selectedVehicle?.brand} {selectedVehicle?.model}</DialogTitle>
          </DialogHeader>
          
          <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-white/70 text-sm mb-1 block">Nombre</label><input type="text" className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-amber-500 focus:outline-none" placeholder="Tu nombre" /></div>
              <div><label className="text-white/70 text-sm mb-1 block">Apellido</label><input type="text" className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-amber-500 focus:outline-none" placeholder="Tu apellido" /></div>
            </div>
            <div><label className="text-white/70 text-sm mb-1 block">Telefono</label><input type="tel" className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-amber-500 focus:outline-none" placeholder="+54 11 1234-5678" /></div>
            <div><label className="text-white/70 text-sm mb-1 block">Email</label><input type="email" className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-amber-500 focus:outline-none" placeholder="tu@email.com" /></div>
            <div><label className="text-white/70 text-sm mb-1 block">Mensaje</label><textarea rows={3} className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-amber-500 focus:outline-none resize-none" placeholder="Estoy interesado en este vehiculo..." /></div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Preferencia de contacto</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contact" value="phone" className="accent-amber-500" /><span className="text-white/70 text-sm">Telefono</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contact" value="whatsapp" className="accent-amber-500" /><span className="text-white/70 text-sm">WhatsApp</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contact" value="email" className="accent-amber-500" /><span className="text-white/70 text-sm">Email</span></label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold py-6">Enviar solicitud</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}