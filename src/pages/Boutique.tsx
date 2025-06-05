
import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoutiqueHeader from '@/components/Boutique/BoutiqueHeader';
import BoutiqueSidebar from '@/components/Boutique/BoutiqueSidebar';
import ProductGrid from '@/components/Boutique/ProductGrid';
import { productStore } from '@/stores/productStore';
import { categoryStore } from '@/stores/categoryStore';

const Boutique = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [products, setProducts] = useState(productStore.getProducts());
  const [categories, setCategories] = useState(categoryStore.getCategories());

  useEffect(() => {
    const unsubscribeProducts = productStore.subscribe(() => {
      setProducts(productStore.getProducts());
    });
    const unsubscribeCategories = categoryStore.subscribe(() => {
      setCategories(categoryStore.getCategories());
    });
    
    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrer par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Trier
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <BoutiqueHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <BoutiqueSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredProducts={filteredAndSortedProducts}
          />

          <ProductGrid
            products={filteredAndSortedProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Boutique;
