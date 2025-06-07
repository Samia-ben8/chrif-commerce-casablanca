
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  status: 'confirmée' | 'en attente' | 'expédiée' | 'livrée';
  total: number;
  items?: number;
}

interface RecentOrdersProps {
  orders: Order[];
  showViewAllButton?: boolean;
}

const RecentOrders = ({ orders, showViewAllButton = false }: RecentOrdersProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmée': return 'text-green-600 bg-green-100';
      case 'en attente': return 'text-yellow-600 bg-yellow-100';
      case 'expédiée': return 'text-blue-600 bg-blue-100';
      case 'livrée': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleViewAllOrders = () => {
    // Navigate to orders tab in dashboard
    navigate('/dashboard?tab=commandes');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes récentes</CardTitle>
        <CardDescription>
          {showViewAllButton ? 'Vos dernières commandes passées' : 'Historique complet de vos commandes'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.date}
                  {order.items && ` • ${order.items} article${order.items > 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium">{order.total.toFixed(2)} DH</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {showViewAllButton && (
          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={handleViewAllOrders}>
              Voir toutes les commandes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
