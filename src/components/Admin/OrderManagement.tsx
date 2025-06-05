
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/types';
import { Eye, Package } from 'lucide-react';

const OrderManagement = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'CMD-001',
      userId: 'user-1',
      items: [
        {
          product: {
            id: '1',
            name: 'Paracétamol 500mg',
            price: 25.00,
            image: '/placeholder.svg',
            category: 'Médicaments',
            stock: 100,
            description: 'Antalgique et antipyrétique'
          },
          quantity: 2
        }
      ],
      total: 50.00,
      status: 'en attente',
      customerInfo: {
        name: 'Ahmed Benali',
        email: 'ahmed@example.com',
        phone: '+212612345678',
        address: '123 Rue Mohammed V, Casablanca'
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'CMD-002',
      userId: 'user-2',
      items: [
        {
          product: {
            id: '2',
            name: 'Vitamine C 1000mg',
            price: 45.00,
            image: '/placeholder.svg',
            category: 'Vitamines',
            stock: 5,
            description: 'Complément alimentaire'
          },
          quantity: 1
        },
        {
          product: {
            id: '3',
            name: 'Thermomètre digital',
            price: 85.00,
            image: '/placeholder.svg',
            category: 'Matériel médical',
            stock: 25,
            description: 'Thermomètre électronique précis'
          },
          quantity: 1
        }
      ],
      total: 130.00,
      status: 'confirmée',
      customerInfo: {
        name: 'Fatima Alami',
        email: 'fatima@example.com',
        phone: '+212678901234',
        address: '456 Avenue Hassan II, Rabat'
      },
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14')
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmée': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'expédiée': return 'bg-blue-100 text-blue-800';
      case 'livrée': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date() }
        : order
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `Le statut de la commande ${orderId} a été mis à jour.`,
    });
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des commandes</CardTitle>
          <CardDescription>
            Gérez et suivez toutes les commandes de vos clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} article{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customerInfo.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.total.toFixed(2)} DH</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openOrderDetails(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en attente">En attente</SelectItem>
                          <SelectItem value="confirmée">Confirmée</SelectItem>
                          <SelectItem value="expédiée">Expédiée</SelectItem>
                          <SelectItem value="livrée">Livrée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails de la commande {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Informations complètes de la commande
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold mb-2">Informations client</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Nom:</strong> {selectedOrder.customerInfo.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                  <p><strong>Téléphone:</strong> {selectedOrder.customerInfo.phone}</p>
                  <p><strong>Adresse:</strong> {selectedOrder.customerInfo.address}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-2">Articles commandés</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">{item.product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qté: {item.quantity}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.product.price.toFixed(2)} DH × {item.quantity} = {(item.product.price * item.quantity).toFixed(2)} DH
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total de la commande:</span>
                  <span>{selectedOrder.total.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                  <span>Date de commande:</span>
                  <span>{selectedOrder.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Dernière mise à jour:</span>
                  <span>{selectedOrder.updatedAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
