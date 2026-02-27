// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchVehiclesFromCRM, CRMVehicle } from '../services/crmService';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  description?: string;
  photos?: string[];
  status: 'available' | 'sold' | 'reserved';
  sellerId?: string;
  sellerName?: string;
  sellerPhone?: string;
}

// Branch interface para el contexto
export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
  image: string;
}

interface AppContextType {
  vehicles: Vehicle[];
  branches: Branch[];
  isLoading: boolean;
  refreshVehicles: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Datos de sucursales
const mockBranches: Branch[] = [
  {
    id: '1',
    name: 'Sucursal Centro',
    address: 'Av. Corrientes 1234',
    city: 'Buenos Aires',
    phone: '+54 9 3624 406228',
    email: 'centro@joseloautomotores.com',
    hours: 'Lun-Vie: 9:00-19:00 | Sab: 10:00-14:00',
    mapUrl: 'https://maps.app.goo.gl/punckdyrKRMpgna57?g_st=awb',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
  },
  {
    id: '2',
    name: 'Sucursal Norte',
    address: 'Av. del Libertador 5678',
    city: 'Vicente Lopez',
    phone: '+54 9 3624 406228',
    email: 'norte@joseloautomotores.com',
    hours: 'Lun-Vie: 9:00-19:00 | Sab: 10:00-14:00',
    mapUrl: 'https://maps.app.goo.gl/jyqudVwk2b5vxjam6?g_st=awb',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800'
  }
];

function convertCRMVehicle(crmVehicle: CRMVehicle): Vehicle {
  return {
    id: crmVehicle.id,
    brand: crmVehicle.brand,
    model: crmVehicle.model,
    year: crmVehicle.year,
    price: crmVehicle.price,
    mileage: crmVehicle.mileage,
    fuelType: crmVehicle.fuelType,
    transmission: crmVehicle.transmission,
    description: crmVehicle.description,
    photos: crmVehicle.photos,
    status: crmVehicle.status,
    sellerId: crmVehicle.sellerId,
    sellerName: crmVehicle.sellerName,
    sellerPhone: crmVehicle.sellerPhone,
  };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshVehicles = useCallback(async () => {
    setIsLoading(true);
    try {
      const crmVehicles = await fetchVehiclesFromCRM();
      const convertedVehicles = crmVehicles.map(convertCRMVehicle);
      setVehicles(convertedVehicles);
    } catch (error) {
      console.error('Error loading vehicles:', error);
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshVehicles();
  }, [refreshVehicles]);

  const value: AppContextType = {
    vehicles,
    branches: mockBranches,
    isLoading,
    refreshVehicles
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// ALIAS para compatibilidad con Branches.tsx
export const useApp = useAppContext;