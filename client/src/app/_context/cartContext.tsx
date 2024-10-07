import { createContext } from 'react';

type CartContextType = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
