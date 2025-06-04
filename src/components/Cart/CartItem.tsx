
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
        <p className="text-sm text-muted-foreground">{item.product.price} DH</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeFromCart(item.product.id)}
        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
