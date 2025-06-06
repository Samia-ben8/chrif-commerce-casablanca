
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

const featuredProducts = [
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
  }
];

const FeaturedProductsSection = () => {
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
          {featuredProducts.map((product) => (
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
