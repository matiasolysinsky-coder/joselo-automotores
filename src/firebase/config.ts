import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// ⚠️ REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES DE FIREBASE
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Referencias a colecciones
export const vehiclesCollection = collection(db, 'vehicles');
export const contactsCollection = collection(db, 'contacts');
export const messagesCollection = collection(db, 'messages');
export const sellersCollection = collection(db, 'sellers');
export const branchesCollection = collection(db, 'branches');

// Funciones auxiliares
export const subscribeToVehicles = (callback: (vehicles: any[]) => void) => {
  return onSnapshot(vehiclesCollection, (snapshot) => {
    const vehicles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(vehicles);
  });
};

export const subscribeToVehicle = (vehicleId: string, callback: (vehicle: any) => void) => {
  const vehicleRef = doc(db, 'vehicles', vehicleId);
  return onSnapshot(vehicleRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    }
  });
};

export const addContact = async (contactData: any) => {
  return await addDoc(contactsCollection, {
    ...contactData,
    createdAt: Timestamp.now(),
    status: 'pending'
  });
};

export const addMessage = async (messageData: any) => {
  return await addDoc(messagesCollection, {
    ...messageData,
    createdAt: Timestamp.now(),
    read: false
  });
};

export { Timestamp };