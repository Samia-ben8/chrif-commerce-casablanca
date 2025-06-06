
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Shield, Star } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow animate-scale-in">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison Casablanca</h3>
              <p className="text-muted-foreground">Livraison rapide dans toute la région de Casablanca</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow animate-scale-in">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité Garantie</h3>
              <p className="text-muted-foreground">Produits authentiques et de qualité professionnelle</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow animate-scale-in">
            <CardContent className="pt-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">20+ Ans d'Expérience</h3>
              <p className="text-muted-foreground">Une expertise reconnue dans notre domaine</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
