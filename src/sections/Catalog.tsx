import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Car, 
  Fuel, 
  Settings, 
  Calendar, 
  DollarSign, 
  Search,
  Filter,
  Phone,
  RefreshCw,
  ImageOff
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

const fuelTypes = [
  { value: 'all', label: 'Todos los combustibles' },
  { value: 'nafta', label: 'Nafta' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'gas', label: 'GNC/Gas' },
  { value: 'electric', label: 'Eléctrico' },
  { value: 'hybrid', label: 'Híbrido' },
];

const transmissions = [
  { value: 'all', label: 'Todas las transmisiones' },
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automática' },
  { value: 'cvt', label: 'CVT' },
];

export default function Catalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const { vehicles, refreshVehicles, isLoading } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Filters animation
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid animation
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm);
    
    const matchesFuel = selectedFuel === 'all' || vehicle.fuelType === selectedFuel;
    const matchesTransmission = selectedTransmission === 'all' || vehicle.transmission === selectedTransmission;
    
    const matchesPrice = 
      (!priceRange.min || vehicle.price >= parseInt(priceRange.min)) &&
      (!priceRange.max || vehicle.price <= parseInt(priceRange.max));
    
    const matchesYear = 
      (!yearRange.min || vehicle.year >= parseInt(yearRange.min)) &&
      (!yearRange.max || vehicle.year <= parseInt(yearRange.max));

    return matchesSearch && matchesFuel && matchesTransmission && matchesPrice && matchesYear;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const isPlaceholderImage = (photoUrl: string) => {
    return photoUrl.includes('placeholder') || photoUrl.includes('default');
  };

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0a0a0a]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full text-[#d4af37] text-sm font-medium tracking-wider uppercase mb-4">
            Nuestro Stock
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Catálogo de <span className="text-[#d4af37]">Vehículos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explora nuestra selección de vehículos de alta calidad. Todos nuestros autos pasan por una rigurosa inspección.
          </p>
          
          {/* Refresh Button */}
          <button
            onClick={refreshVehicles}
            disabled={isLoading}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Actualizando...' : 'Actualizar stock'}
          </button>
        </div>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            {/* Fuel Filter */}
            <div className="relative">
              <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
              >
                {fuelTypes.map((fuel) => (
                  <option key={fuel.value} value={fuel.value} className="bg-[#1a1a1a]">
                    {fuel.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission Filter */}
            <div className="relative">
              <Settings className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
              >
                {transmissions.map((trans) => (
                  <option key={trans.value} value={trans.value} className="bg-[#1a1a1a]">
                    {trans.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Precio min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            {/* Year Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Año min"
                value={yearRange.min}
                onChange={(e) => setYearRange({ ...yearRange, min: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedFuel !== 'all' || selectedTransmission !== 'all' || priceRange.min || priceRange.max || yearRange.min || yearRange.max) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
              <Filter className="w-4 h-4 text-[#d4af37]" />
              <span className="text-sm text-gray-400">Filtros activos:</span>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFuel('all');
                  setSelectedTransmission('all');
                  setPriceRange({ min: '', max: '' });
                  setYearRange({ min: '', max: '' });
                }}
                className="text-sm text-[#d4af37] hover:underline"
              >
                Limpiar todos
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Mostrando <span className="text-white font-semibold">{filteredVehicles.length}</span> vehículos
            {vehicles.length > 0 && (
              <span className="text-gray-500"> (de {vehicles.length} disponibles)</span>
            )}
          </p>
        </div>

        {/* Vehicles Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron vehículos</h3>
              <p className="text-gray-400">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="vehicle-card group relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  {vehicle.photos && vehicle.photos.length > 0 && !isPlaceholderImage(vehicle.photos[0]) ? (
                    <img
                      src={vehicle.photos[0]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                      <ImageOff className="w-16 h-16 mb-2" />
                      <span className="text-sm">Sin foto disponible</span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      vehicle.status === 'available' 
                        ? 'bg-green-500/90 text-white' 
                        : vehicle.status === 'sold'
                        ? 'bg-red-500/90 text-white'
                        : 'bg-yellow-500/90 text-white'
                    }`}>
                      {vehicle.status === 'available' ? 'Disponible' : vehicle.status === 'sold' ? 'Vendido' : 'Reservado'}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{vehicle.year}</span>
                    </div>
                    {vehicle.mileage && (
                      <div className="flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        <span>{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicle.fuelType && (
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 flex items-center gap-1">
                        <Fuel className="w-3 h-3" />
                        {vehicle.fuelType}
                      </span>
                    )}
                    {vehicle.transmission && (
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 flex items-center gap-1">
                        <Settings className="w-3 h-3" />
                        {vehicle.transmission}
                      </span>
                    )}
                  </div>

                  {vehicle.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {vehicle.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1 text-[#d4af37]">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-2xl font-bold">{formatPrice(vehicle.price)}</span>
                    </div>
                    
                    <a
                      href={`https://wa.me/5493624406228?text=Hola! Me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year} que vi en la web.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-black rounded-lg font-semibold hover:bg-[#e5c048] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Consultar
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}