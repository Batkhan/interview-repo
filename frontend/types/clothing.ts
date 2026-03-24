export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'shoes'
  | 'accessories'
  | 'outerwear'
  | 'dresses'
  | 'bags';

export type SourceType = 'photo' | 'link' | 'browse' | 'search';

export interface ClothingItem {
  id: string;
  user_id: string;
  name: string;
  brand: string;
  category: ClothingCategory;
  color: string;
  image_url: string;
  source_type: SourceType;
  source_url: string;
  popular_item_id: string;
  created_at: string;
  updated_at: string;
}

export interface AddItemRequest {
  name: string;
  brand: string;
  category: ClothingCategory;
  color?: string;
  image_url: string;
  source_type: SourceType;
  source_url?: string;
  popular_item_id?: string;
  price?: string;
}
