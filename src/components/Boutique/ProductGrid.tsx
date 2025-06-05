
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
}

const ProductGrid = ({ products, searchQuery, setSearchQuery, setSelectedCategory }: ProductGridProps) => {
  return (
    <div className="lg:col-span-3">
      {/* Barre de recherche */}
      <div className="mb-8">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Résultats */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
          <p className="text-muted-foreground mb-6">
            Essayez de modifier vos critères de recherche ou de filtrage
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setSelectedCategory(null);
          }}>
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {products.length} produit(s) trouvé(s)
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
