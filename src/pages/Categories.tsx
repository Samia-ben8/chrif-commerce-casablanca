
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { categoryStore } from '@/stores/categoryStore';
import { Package, Wrench, Paintbrush, Lightbulb, Home, Car, Plus, Trash2 } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState(categoryStore.getCategories());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = categoryStore.subscribe(() => {
      setCategories(categoryStore.getCategories());
    });
    return unsubscribe;
  }, []);

  const iconMap: { [key: string]: any } = {
    'Plomberie': Wrench,
    'Peinture': Paintbrush,
    'Électricité': Lightbulb,
    'Quincaillerie': Package,
    'Jardinage': Home,
    'Automobile': Car,
    'Agriculture': Package,
    'Droguerie': Package,
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      categoryStore.addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAddDialogOpen(false);
      toast({
        title: "Catégorie ajoutée",
        description: `La catégorie "${newCategoryName}" a été ajoutée avec succès.`,
      });
    }
  };

  const handleRemoveCategory = (id: string, name: string) => {
    categoryStore.removeCategory(id);
    toast({
      title: "Catégorie supprimée",
      description: `La catégorie "${name}" a été supprimée.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">Catégories de produits</h1>
            <p className="text-muted-foreground">
              Découvrez notre large gamme de produits organisés par catégories
            </p>
          </div>
          
          {user?.role === 'admin' && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une catégorie
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle catégorie de produits
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="categoryName">Nom de la catégorie</Label>
                    <Input
                      id="categoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Ex: Électroménager"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddCategory}>Ajouter la catégorie</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const IconComponent = iconMap[category.name] || Package;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {category.count} produits
                        </p>
                      </div>
                    </div>
                    {user?.role === 'admin' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveCategory(category.id, category.name)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Découvrez nos produits de {category.name.toLowerCase()}
                  </CardDescription>
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
