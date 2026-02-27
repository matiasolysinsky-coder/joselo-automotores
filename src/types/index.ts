export interface Vehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    currency: string;
    category: 'auto' | 'camioneta' | 'suv' | 'deportivo' | 'pickup';
    condition: 'nuevo' | 'usado';
    mileage: number;
    fuelType: 'nafta' | 'diesel' | 'electrico' | 'hibrido';
    transmission: 'manual' | 'automatico';
    engine: string;
    power: string;
    color: string;
    doors: number;
    seats: number;
    description: string;
    features: string[];
    images: string[];
    mainImage: string;
    stock: number;
    status: 'disponible' | 'reservado' | 'vendido';
    branchId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Branch {
    id: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    hours: string;
    latitude: number;
    longitude: number;
    image: string;
  }
  
  export interface Seller {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    whatsapp: string;
    photo: string;
    branchId: string;
    specialties: string[];
    active: boolean;
  }
  
  export interface FilterOptions {
    category?: string;
    brand?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    year?: number;
    fuelType?: string;
    transmission?: string;
  }