
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const isLowStock = product.stock < 6;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté au panier`,
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        {isLowStock && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="text-xs bg-yellow-500 text-yellow-900">
              Stock bas
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{product.price} DH</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Stock: <span className={isLowStock ? 'text-yellow-600 font-medium' : ''}>{product.stock}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gradient-primary text-primary-foreground hover:opacity-90"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
