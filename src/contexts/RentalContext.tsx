import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Rental {
  id: string;
  type: 'bike' | 'car';
  model: string;
  duration: string;
  fromLocation: string;
  toLocation: string;
  price: number;
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  image: string;
}

interface RentalContextType {
  rentals: Rental[];
  addRental: (rental: Omit<Rental, 'id'>) => void;
  updateRentalStatus: (id: string, status: Rental['status']) => void;
  activeRental: Rental | null;
  setActiveRental: (rental: Rental | null) => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const useRental = () => {
  const context = useContext(RentalContext);
  if (context === undefined) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};

interface RentalProviderProps {
  children: ReactNode;
}

export const RentalProvider: React.FC<RentalProviderProps> = ({ children }) => {
  const [rentals, setRentals] = useState<Rental[]>([
    {
      id: '1',
      type: 'bike',
      model: 'Honda CB250R',
      duration: '3 days',
      fromLocation: 'Downtown',
      toLocation: 'Airport',
      price: 150,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'
    },
    {
      id: '2',
      type: 'car',
      model: 'Toyota Camry',
      duration: '1 week',
      fromLocation: 'City Center',
      toLocation: 'Suburbs',
      price: 420,
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-01-08',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'
    }
  ]);
  
  const [activeRental, setActiveRental] = useState<Rental | null>(rentals.find(r => r.status === 'active') || null);

  const addRental = (rental: Omit<Rental, 'id'>) => {
    const newRental = {
      ...rental,
      id: Date.now().toString()
    };
    setRentals(prev => [...prev, newRental]);
  };

  const updateRentalStatus = (id: string, status: Rental['status']) => {
    setRentals(prev => prev.map(rental => 
      rental.id === id ? { ...rental, status } : rental
    ));
    
    if (activeRental?.id === id) {
      setActiveRental(prev => prev ? { ...prev, status } : null);
    }
  };

  const value = {
    rentals,
    addRental,
    updateRentalStatus,
    activeRental,
    setActiveRental
  };

  return (
    <RentalContext.Provider value={value}>
      {children}
    </RentalContext.Provider>
  );
};