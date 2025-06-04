
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartButtonProps {
  onClick: () => void;
}

const CartButton = ({ onClick }: CartButtonProps) => {
  const { itemsCount } = useCart();

  return (
    <Button variant="ghost" size="sm" className="relative" onClick={onClick}>
      <ShoppingCart className="h-5 w-5" />
      {itemsCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
          {itemsCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
