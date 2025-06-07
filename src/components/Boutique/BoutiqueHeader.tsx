
import { Card, CardContent } from '@/components/ui/card';

const BoutiqueHeader = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Boutique</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Parcourez notre catalogue complet de produits de qualité
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoutiqueHeader;
