
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { generateOrderId } from '@/utils/storage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import CartItem from '@/components/Cart/CartItem';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: 'Casablanca'
    }
  });

  const deliveryFee = 25; // Fixed delivery fee for Casablanca
  const finalTotal = total + deliveryFee;

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate order processing
      const orderId = generateOrderId();
      
      // Here you would typically send the order to your backend
      console.log('Order placed:', {
        id: orderId,
        userId: user?.id,
        items,
        total: finalTotal,
        customerInfo: data,
        status: 'en attente',
        createdAt: new Date()
      });

      clearCart();
      
      toast({
        title: "Commande confirmée!",
        description: `Votre commande ${orderId} a été reçue et est en attente de confirmation.`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la commande.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Panier vide</h1>
            <p className="text-muted-foreground mb-8">
              Votre panier est vide. Ajoutez des produits pour continuer.
            </p>
            <Button asChild>
              <a href="/boutique">Continuer les achats</a>
            </Button>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Finaliser la commande</h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`${step >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                1. Révision
              </span>
              <span className="text-muted-foreground">→</span>
              <span className={`${step >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                2. Livraison
              </span>
              <span className="text-muted-foreground">→</span>
              <span className={`${step >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                3. Confirmation
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Révision de la commande</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <CartItem key={item.product.id} item={item} />
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        onClick={() => setStep(2)}
                        className="w-full"
                      >
                        Continuer vers la livraison
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de livraison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input
                            id="name"
                            {...register('name', { required: 'Nom requis' })}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            {...register('phone', { required: 'Téléphone requis' })}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email', { required: 'Email requis' })}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse complète</Label>
                        <Input
                          id="address"
                          {...register('address', { required: 'Adresse requise' })}
                        />
                        {errors.address && (
                          <p className="text-sm text-destructive">{errors.address.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          {...register('city', { required: 'Ville requise' })}
                        />
                        {errors.city && (
                          <p className="text-sm text-destructive">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes pour la livraison (optionnel)</Label>
                        <Input
                          id="notes"
                          placeholder="Instructions spéciales pour la livraison..."
                          {...register('notes')}
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(1)}
                          className="flex-1"
                        >
                          Retour
                        </Button>
                        <Button 
                          type="submit"
                          className="flex-1 gradient-primary text-primary-foreground"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Traitement...' : 'Confirmer la commande'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span>{item.product.name} × {item.quantity}</span>
                        <span>{(item.product.price * item.quantity).toFixed(2)} DH</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{total.toFixed(2)} DH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>{deliveryFee.toFixed(2)} DH</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{finalTotal.toFixed(2)} DH</span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>• Paiement à la livraison</p>
                    <p>• Livraison dans Casablanca</p>
                    <p>• Confirmation par téléphone</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
