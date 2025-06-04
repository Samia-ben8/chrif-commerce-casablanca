import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Données d'exemple - À remplacer par des données réelles plus tard
const allProducts = [
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

const categories = [
  { id: 'Agriculture', name: 'Agriculture', count: 2 },
  { id: 'Quincaillerie', name: 'Quincaillerie', count: 3 },
  { id: 'Peinture', name: 'Peinture', count: 2 },
  { id: 'Droguerie', name: 'Droguerie', count: 1 }
];

const Boutique = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Boutique</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits pour l'agriculture, la quincaillerie, 
            la droguerie et la peinture
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar avec filtres */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Trier par</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom (A-Z)</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="stock">Stock disponible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Statistiques</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total produits:</span>
                  <span className="font-medium">{filteredAndSortedProducts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stock bas:</span>
                  <span className="font-medium text-yellow-600">
                    {filteredAndSortedProducts.filter(p => p.stock < 6).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {/* Barre de recherche */}
            <div className="mb-8">
              <SearchBar onSearch={setSearchQuery} />
            </div>

            {/* Résultats */}
            {filteredAndSortedProducts.length === 0 ? (
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
                    {filteredAndSortedProducts.length} produit(s) trouvé(s)
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Boutique;
