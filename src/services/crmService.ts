// src/services/crmService.ts

export interface CRMVehicle {
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
    createdAt?: string;
    updatedAt?: string;
  }
  
  const CRM_BASE_URL = 'https://crm-mako.vercel.app/api';
  
  /**
   * Fetch all vehicles from the CRM
   */
  export async function fetchVehiclesFromCRM(): Promise<CRMVehicle[]> {
    try {
      const response = await fetch(`${CRM_BASE_URL}/vehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.vehicles || [];
    } catch (error) {
      console.error('Error fetching vehicles from CRM:', error);
      return [];
    }
  }
  
  /**
   * Fetch vehicles that have at least one photo
   */
  export async function fetchVehiclesWithPhotos(): Promise<CRMVehicle[]> {
    try {
      const vehicles = await fetchVehiclesFromCRM();
      return vehicles.filter(v => v.photos && v.photos.length > 0);
    } catch (error) {
      console.error('Error fetching vehicles with photos:', error);
      return [];
    }
  }
  
  /**
   * Upload a photo for a specific vehicle
   */
  export async function uploadVehiclePhoto(
    vehicleId: string, 
    photoFile: File
  ): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('photo', photoFile);
      formData.append('vehicleId', vehicleId);
  
      const response = await fetch(`${CRM_BASE_URL}/vehicles/${vehicleId}/photos`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.photoUrl;
    } catch (error) {
      console.error('Error uploading vehicle photo:', error);
      throw error;
    }
  }
  
  /**
   * Get a single vehicle by ID
   */
  export async function getVehicleById(id: string): Promise<CRMVehicle | null> {
    try {
      const vehicles = await fetchVehiclesFromCRM();
      return vehicles.find(v => v.id === id) || null;
    } catch (error) {
      console.error('Error fetching vehicle by ID:', error);
      return null;
    }
  }
  
  // Default export for compatibility
  export default {
    fetchVehiclesFromCRM,
    fetchVehiclesWithPhotos,
    uploadVehiclePhoto,
    getVehicleById,
  };