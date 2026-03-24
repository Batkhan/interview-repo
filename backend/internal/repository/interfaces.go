package repository

import (
	"context"

	"interview-repo/internal/model"
)

type WardrobeRepo interface {
	ListItems(ctx context.Context, userID, category string) ([]model.ClothingItem, error)
	GetItem(ctx context.Context, id string) (*model.ClothingItem, error)
	AddItem(ctx context.Context, userID string, req model.AddItemRequest) (*model.ClothingItem, error)
	UpdateItem(ctx context.Context, id string, req model.AddItemRequest) (*model.ClothingItem, error)
	DeleteItem(ctx context.Context, id string) error
	GetCategories(ctx context.Context, userID string) (map[string]int, error)
}
