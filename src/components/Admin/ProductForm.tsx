
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/stores/productStore';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface ProductFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: any) => void;
  product?: Product | null;
  categories: Category[];
  title: string;
  description: string;
}

const ProductForm = ({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  product, 
  categories, 
  title, 
  description 
}: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: ''
  });

  // Mettre à jour le formulaire quand le produit change
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price.toString() || '',
        category: product.category || '',
        stock: product.stock.toString() || '',
        description: product.description || '',
        image: product.image || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        image: ''
      });
    }
  }, [product, isOpen]);

  const handleSubmit = () => {
    onSubmit(formData);
    if (!product) {
      setFormData({ name: '', price: '', category: '', stock: '', description: '', image: '' });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !product) {
      setFormData({ name: '', price: '', category: '', stock: '', description: '', image: '' });
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Prix (DH)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">URL de l'image</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {product ? 'Modifier le produit' : 'Ajouter le produit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
