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

  sortMode: 'newest' | 'oldest' | 'name';
  fetchItems: (category?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  addItem: (req: AddItemRequest) => Promise<ClothingItem>;
  deleteItem: (id: string) => Promise<void>;
  setCategory: (category: string) => void;
  setSortMode: (mode: 'newest' | 'oldest' | 'name') => void;
  clearError: () => void;
}

const sortItems = (items: ClothingItem[], mode: 'newest' | 'oldest' | 'name') => {
  return [...items].sort((a, b) => {
    if (mode === 'name') return a.name.localeCompare(b.name);
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return mode === 'oldest' ? dateA - dateB : dateB - dateA;
  });
};

export const useWardrobeStore = create<WardrobeState>((set, get) => ({
  items: [],
  categories: {},
  selectedCategory: '',
  sortMode: 'newest',
  isLoading: false,
  error: null,

  fetchItems: async (category) => {
    set({ isLoading: true, error: null });
    try {
      const items = await wardrobeAPI.listItems(category || get().selectedCategory || undefined);
      set({ items: sortItems(items, get().sortMode), isLoading: false });
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
    set((state) => ({ items: sortItems([item, ...state.items], state.sortMode) }));
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
  setSortMode: (mode: 'newest' | 'oldest' | 'name') => {
    set({ sortMode: mode });
    set((state: WardrobeState) => ({ items: sortItems(state.items, mode) }));
  },
  clearError: () => set({ error: null }),
}));
