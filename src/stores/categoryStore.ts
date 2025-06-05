
// Store simple pour gérer les catégories
class CategoryStore {
  private categories: Array<{id: string, name: string, count: number}> = [
    { id: 'Agriculture', name: 'Agriculture', count: 2 },
    { id: 'Quincaillerie', name: 'Quincaillerie', count: 3 },
    { id: 'Peinture', name: 'Peinture', count: 2 },
    { id: 'Droguerie', name: 'Droguerie', count: 1 }
  ];

  private listeners: Array<() => void> = [];

  getCategories() {
    return [...this.categories];
  }

  addCategory(name: string) {
    const id = name.replace(/\s+/g, '-').toLowerCase();
    const exists = this.categories.find(cat => cat.id === id);
    if (!exists) {
      this.categories.push({ id, name, count: 0 });
      this.notifyListeners();
    }
  }

  removeCategory(id: string) {
    this.categories = this.categories.filter(cat => cat.id !== id);
    this.notifyListeners();
  }

  updateCategoryCount(categoryName: string, count: number) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      category.count = count;
      this.notifyListeners();
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const categoryStore = new CategoryStore();
