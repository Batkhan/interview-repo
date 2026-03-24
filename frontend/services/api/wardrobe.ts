import { apiClient } from './client';
import { APIResponse, ClothingItem, AddItemRequest } from '../../types';

export const wardrobeAPI = {
  listItems: async (category?: string): Promise<ClothingItem[]> => {
    const params = category ? { category } : {};
    const { data } = await apiClient.get<APIResponse<ClothingItem[]>>('/wardrobe', { params });
    return data.data || [];
  },

  addItem: async (req: AddItemRequest): Promise<ClothingItem> => {
    const { data } = await apiClient.post<APIResponse<ClothingItem>>('/wardrobe', req);
    return data.data;
  },

  deleteItem: async (id: string): Promise<void> => {
    await apiClient.delete(`/wardrobe/${id}`);
  },

  getCategories: async (): Promise<Record<string, number>> => {
    const { data } = await apiClient.get<APIResponse<Record<string, number>>>('/wardrobe/categories');
    return data.data;
  },
};
