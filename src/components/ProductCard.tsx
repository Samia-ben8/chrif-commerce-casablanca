
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté au panier`,
    });
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const getStockBadge = () => {
    if (product.stock === 0) {
      return <Badge variant="destructive">Rupture</Badge>;
    } else if (product.stock <= 10) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Stock faible</Badge>;
    }
    return <Badge variant="outline" className="border-green-500 text-green-700">En stock</Badge>;
  };

  return (
    <Card 
      className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleProductClick}
    >
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            {getStockBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2">
            {product.category}
          </CardDescription>
          {product.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{product.price.toFixed(2)} DH</span>
            <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
          </div>
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
