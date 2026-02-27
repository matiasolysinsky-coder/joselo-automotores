import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Vehicle, Branch, Seller, FilterOptions } from '@/types';
import { mockVehicles, mockBranches, mockSellers } from '@/data/mockData';
import { subscribeToVehicles, addContact as addContactFirebase } from '@/firebase/config';

interface AppContextType {
  vehicles: Vehicle[];
  branches: Branch[];
  sellers: Seller[];
  loading: boolean;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  filteredVehicles: Vehicle[];
  formatPrice: (price: number, currency: string) => string;
  addContact: (contact: any) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [branches] = useState<Branch[]>(mockBranches);
  const [sellers] = useState<Seller[]>(mockSellers);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});

  // Suscribirse a Firebase
  useEffect(() => {
    try {
      const unsubscribe = subscribeToVehicles((firebaseVehicles) => {
        if (firebaseVehicles.length > 0) {
          setVehicles(firebaseVehicles as Vehicle[]);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log('Usando datos mock');
      setLoading(false);
    }
  }, []);

  // Filtrar vehículos
  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.category && vehicle.category !== filters.category) return false;
    if (filters.brand && vehicle.brand !== filters.brand) return false;
    if (filters.condition && vehicle.condition !== filters.condition) return false;
    return true;
  });

  // Formatear precio
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  // Agregar contacto
  const addContact = async (contact: any) => {
    try {
      await addContactFirebase(contact);
    } catch (error) {
      console.log('Guardado localmente');
    }
  };

  return (
    <AppContext.Provider value={{
      vehicles, branches, sellers, loading,
      filters, setFilters, filteredVehicles,
      formatPrice, addContact
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp debe usarse dentro de AppProvider');
  return context;
};