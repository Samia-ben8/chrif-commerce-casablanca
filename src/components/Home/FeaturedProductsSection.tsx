
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { productStore, Product } from '@/stores/productStore';

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = productStore.subscribe(() => {
      const allProducts = productStore.getProducts();
      // Prendre les 4 premiers produits comme produits populaires
      setProducts(allProducts.slice(0, 4));
    });
    
    // Initialiser avec les produits actuels
    const allProducts = productStore.getProducts();
    setProducts(allProducts.slice(0, 4));
    
    return unsubscribe;
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits Populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de nos produits les plus demandés dans toutes nos catégories
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="gradient-primary text-primary-foreground">
            <Link to="/boutique">
              Voir tous les produits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
