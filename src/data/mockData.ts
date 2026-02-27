import type { Vehicle, Branch, Seller } from '@/types';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2024,
    price: 28500000,
    currency: 'ARS',
    category: 'auto',
    condition: 'nuevo',
    mileage: 0,
    fuelType: 'nafta',
    transmission: 'automatico',
    engine: '2.0L Dynamic Force',
    power: '169 HP',
    color: 'Blanco Perlado',
    doors: 4,
    seats: 5,
    description: 'El Toyota Corolla 2024 representa la excelencia en diseño, tecnología y eficiencia.',
    features: ['Sistema Toyota Safety Sense 3.0', 'Pantalla táctil de 10.5"', 'Apple CarPlay y Android Auto'],
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'],
    mainImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    stock: 3,
    status: 'disponible',
    branchId: '1',
    sellerId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Agregá más vehículos acá...
];

export const mockBranches: Branch[] = [
  {
    id: '1',
    name: 'Sucursal Centro',
    address: 'Av. Corrientes 1234',
    city: 'Buenos Aires',
    phone: '+54 11 4567-8900',
    email: 'centro@joseloautomotores.com',
    hours: 'Lun-Vie: 9:00-19:00 | Sáb: 10:00-14:00',
    latitude: -34.6037,
    longitude: -58.3816,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
  },
  {
    id: '2',
    name: 'Sucursal Norte',
    address: 'Av. del Libertador 5678',
    city: 'Vicente López',
    phone: '+54 11 4789-0123',
    email: 'norte@joseloautomotores.com',
    hours: 'Lun-Vie: 9:00-19:00 | Sáb: 10:00-14:00',
    latitude: -34.5248,
    longitude: -58.4833,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800'
  }
];

export const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'Carlos',
    lastName: 'Rodríguez',
    phone: '+54 11 3456-7890',
    email: 'crodriguez@joseloautomotores.com',
    whatsapp: '+5491134567890',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    branchId: '1',
    specialties: ['autos', 'suvs'],
    active: true
  }
];

export const brands = ['Toyota', 'Ford', 'BMW', 'Honda', 'Chevrolet', 'Volkswagen'];
export const categories = [
  { value: 'auto', label: 'Autos' },
  { value: 'camioneta', label: 'Camionetas' },
  { value: 'suv', label: 'SUVs' },
  { value: 'deportivo', label: 'Deportivos' },
  { value: 'pickup', label: 'Pickups' }
];