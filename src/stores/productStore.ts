
import { categoryStore } from './categoryStore';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

class ProductStore {
  private products: Product[] = [
    {
      id: '1',
      name: 'Tuyau goutte à goutte 16mm - 100m',
      price: 245,
      image: '/placeholder.svg',
      category: 'Agriculture',
      stock: 12,
      description: 'Tuyau d\'irrigation goutte à goutte de qualité professionnelle'
    },
    {
      id: '2',
      name: 'Insecticide Anti-Pucerons 500ml',
      price: 85,
      image: '/placeholder.svg',
      category: 'Agriculture',
      stock: 8,
      description: 'Traitement efficace contre les pucerons et parasites'
    },
    {
      id: '3',
      name: 'Pompe à eau manuelle 5L',
      price: 320,
      image: '/placeholder.svg',
      category: 'Quincaillerie',
      stock: 5,
      description: 'Pompe à eau portable pour usage domestique'
    },
    {
      id: '4',
      name: 'Peinture décorative blanche 2.5L',
      price: 180,
      image: '/placeholder.svg',
      category: 'Peinture',
      stock: 15,
      description: 'Peinture murale de haute qualité, finition mate'
    },
    {
      id: '5',
      name: 'Corde pour puits 20m',
      price: 65,
      image: '/placeholder.svg',
      category: 'Quincaillerie',
      stock: 3,
      description: 'Corde résistante pour puits, diamètre 12mm'
    },
    {
      id: '6',
      name: 'Désinfectant sol 1L',
      price: 45,
      image: '/placeholder.svg',
      category: 'Droguerie',
      stock: 20,
      description: 'Désinfectant efficace pour tous types de sols'
    },
    {
      id: '7',
      name: 'Pompe électrique 15L',
      price: 850,
      image: '/placeholder.svg',
      category: 'Quincaillerie',
      stock: 2,
      description: 'Pompe électrique haute performance 220V'
    },
    {
      id: '8',
      name: 'Peinture extérieure rouge 5L',
      price: 325,
      image: '/placeholder.svg',
      category: 'Peinture',
      stock: 8,
      description: 'Peinture résistante aux intempéries'
    }
  ];

  private listeners: Array<() => void> = [];

  constructor() {
    this.updateCategoryCounts();
  }

  getProducts() {
    return [...this.products];
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    this.products.push(newProduct);
    this.updateCategoryCounts();
    this.notifyListeners();
  }

  updateProduct(id: string, updates: Partial<Product>) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      this.updateCategoryCounts();
      this.notifyListeners();
    }
  }

  removeProduct(id: string) {
    this.products = this.products.filter(p => p.id !== id);
    this.updateCategoryCounts();
    this.notifyListeners();
  }

  private updateCategoryCounts() {
    const categories = categoryStore.getCategories();
    categories.forEach(category => {
      const count = this.products.filter(p => p.category === category.name).length;
      categoryStore.updateCategoryCount(category.name, count);
    });
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const productStore = new ProductStore();
