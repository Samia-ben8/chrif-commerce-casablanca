export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'user';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'en attente' | 'confirmée' | 'expédiée' | 'livrée';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemsCount: number;
}
