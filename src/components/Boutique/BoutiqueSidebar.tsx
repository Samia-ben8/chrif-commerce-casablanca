
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

interface BoutiqueSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  filteredProducts: Product[];
}

const BoutiqueSidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  sortBy, 
  setSortBy, 
  filteredProducts 
}: BoutiqueSidebarProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-card border rounded-lg p-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
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
            <span className="font-medium">{filteredProducts.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Stock bas:</span>
            <span className="font-medium text-yellow-600">
              {filteredProducts.filter(p => p.stock < 6).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoutiqueSidebar;
