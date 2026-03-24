import { useEffect } from 'react';
import { useWardrobeStore } from '../stores/wardrobeStore';

export const useWardrobe = () => {
  const store = useWardrobeStore();

  useEffect(() => {
    store.fetchItems();
    store.fetchCategories();
  }, []);

  return {
    items: store.items,
    categories: store.categories,
    selectedCategory: store.selectedCategory,
    isLoading: store.isLoading,
    error: store.error,
    addItem: store.addItem,
    deleteItem: store.deleteItem,
    setCategory: store.setCategory,
    refresh: () => store.fetchItems(),
  };
};
