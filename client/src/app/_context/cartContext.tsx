import React, { useContext, useState } from 'react';
import { createContext } from 'react';

type CartContextType = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
};

// Create the context with an initial undefined state
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component that manages the cart state internally
export const CartProvider = ({ children }: { children: any }) => {
  const [cart, setCart] = useState<any[]>([]); // Manage state directly within the provider

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext safely in components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
