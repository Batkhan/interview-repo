package model

import "time"

var AllCategories = []string{"tops", "bottoms", "shoes", "accessories", "outerwear", "dresses", "bags"}

type ClothingItem struct {
	ID            string    `json:"id"`
	UserID        string    `json:"user_id"`
	Name          string    `json:"name"`
	Brand         string    `json:"brand"`
	Category      string    `json:"category"`
	Color         string    `json:"color"`
	ImageURL      string    `json:"image_url"`
	SourceType    string    `json:"source_type"`
	SourceURL     string    `json:"source_url,omitempty"`
	PopularItemID string    `json:"popular_item_id,omitempty"`
	Price         string    `json:"price,omitempty"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type AddItemRequest struct {
	Name          string `json:"name"`
	Brand         string `json:"brand"`
	Category      string `json:"category"`
	Color         string `json:"color"`
	ImageURL      string `json:"image_url"`
	SourceType    string `json:"source_type"`
	SourceURL     string `json:"source_url,omitempty"`
	PopularItemID string `json:"popular_item_id,omitempty"`
	Price         string `json:"price,omitempty"`
}
