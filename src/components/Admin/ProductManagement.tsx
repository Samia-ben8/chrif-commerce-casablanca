
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { productStore, Product } from '@/stores/productStore';
import { categoryStore } from '@/stores/categoryStore';
import { Plus } from 'lucide-react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

const ProductManagement = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState(categoryStore.getCategories());

  useEffect(() => {
    const unsubscribeProducts = productStore.subscribe(() => {
      setProducts(productStore.getProducts());
    });
    const unsubscribeCategories = categoryStore.subscribe(() => {
      setCategories(categoryStore.getCategories());
    });
    
    setProducts(productStore.getProducts());
    
    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  const handleAddProduct = (formData: any) => {
    const newProduct: Omit<Product, 'id'> = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image || '/placeholder.svg',
      category: formData.category,
      stock: parseInt(formData.stock),
      description: formData.description
    };

    productStore.addProduct(newProduct);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Produit ajouté",
      description: "Le produit a été ajouté avec succès.",
    });
  };

  const handleEditProduct = (formData: any) => {
    if (!selectedProduct) return;

    const updates: Partial<Product> = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      description: formData.description,
      image: formData.image || selectedProduct.image
    };

    productStore.updateProduct(selectedProduct.id, updates);
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
    
    toast({
      title: "Produit modifié",
      description: "Le produit a été modifié avec succès.",
    });
  };

  const handleDeleteProduct = (id: string) => {
    productStore.removeProduct(id);
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé avec succès.",
    });
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestion des produits</CardTitle>
              <CardDescription>
                Ajoutez, modifiez ou supprimez des produits de votre catalogue
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un produit
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <ProductTable 
            products={products}
            onEdit={openEditDialog}
            onDelete={handleDeleteProduct}
          />
        </CardContent>
      </Card>

      <ProductForm
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddProduct}
        categories={categories}
        title="Ajouter un nouveau produit"
        description="Remplissez les informations du nouveau produit"
      />

      <ProductForm
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditProduct}
        product={selectedProduct}
        categories={categories}
        title="Modifier le produit"
        description="Modifiez les informations du produit"
      />
    </div>
  );
};

export default ProductManagement;
