
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Wrench, Paintbrush, Lightbulb, Home, Car } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Plomberie',
      description: 'Tuyaux, raccords, robinets et accessoires de plomberie',
      icon: Wrench,
      productCount: 45
    },
    {
      id: 2,
      name: 'Peinture',
      description: 'Peintures, vernis, pinceaux et matériel de peinture',
      icon: Paintbrush,
      productCount: 32
    },
    {
      id: 3,
      name: 'Électricité',
      description: 'Câbles, prises, interrupteurs et matériel électrique',
      icon: Lightbulb,
      productCount: 28
    },
    {
      id: 4,
      name: 'Quincaillerie',
      description: 'Vis, clous, outils et accessoires divers',
      icon: Package,
      productCount: 67
    },
    {
      id: 5,
      name: 'Jardinage',
      description: 'Outils de jardinage, graines et produits pour le jardin',
      icon: Home,
      productCount: 23
    },
    {
      id: 6,
      name: 'Automobile',
      description: 'Huiles, filtres et accessoires automobiles',
      icon: Car,
      productCount: 19
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Catégories de produits</h1>
          <p className="text-muted-foreground">
            Découvrez notre large gamme de produits organisés par catégories
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {category.productCount} produits
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Categories;
