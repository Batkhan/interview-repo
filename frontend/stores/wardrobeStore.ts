import { create } from 'zustand';
import { ClothingItem, AddItemRequest } from '../types';
import { wardrobeAPI } from '../services/api/wardrobe';
import { friendlyError } from '../utils/friendlyError';

interface WardrobeState {
  items: ClothingItem[];
  categories: Record<string, number>;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;

  fetchItems: (category?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  addItem: (req: AddItemRequest) => Promise<ClothingItem>;
  deleteItem: (id: string) => Promise<void>;
  setCategory: (category: string) => void;
  clearError: () => void;
}

export const useWardrobeStore = create<WardrobeState>((set, get) => ({
  items: [],
  categories: {},
  selectedCategory: '',
  isLoading: false,
  error: null,

  fetchItems: async (category) => {
    set({ isLoading: true, error: null });
    try {
      const items = await wardrobeAPI.listItems(category || get().selectedCategory || undefined);
      set({ items, isLoading: false });
    } catch (e: unknown) {
      set({ isLoading: false, error: friendlyError(e, 'Couldn\'t load your wardrobe. Please try again.') });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await wardrobeAPI.getCategories();
      set({ categories });
    } catch (e: unknown) {
      set({ error: friendlyError(e, 'Couldn\'t load categories. Please try again.') });
    }
  },

  addItem: async (req) => {
    set({ error: null });
    const item = await wardrobeAPI.addItem(req);
    set((state) => ({ items: [item, ...state.items] }));
    return item;
  },

  deleteItem: async (id) => {
    set({ error: null });
    await wardrobeAPI.deleteItem(id);
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchItems(category);
  },
  clearError: () => set({ error: null }),
}));
