package service

import (
	"context"

	"interview-repo/internal/model"
	"interview-repo/internal/repository"
)

type WardrobeService struct {
	repo repository.WardrobeRepo
}

func NewWardrobeService(repo repository.WardrobeRepo) *WardrobeService {
	return &WardrobeService{repo: repo}
}

func (s *WardrobeService) ListItems(ctx context.Context, userID, category string) ([]model.ClothingItem, error) {
	return s.repo.ListItems(ctx, userID, category)
}

func (s *WardrobeService) GetItem(ctx context.Context, userID, id string) (*model.ClothingItem, error) {
	return s.repo.GetItem(ctx, id)
}

func (s *WardrobeService) AddItem(ctx context.Context, userID string, req model.AddItemRequest) (*model.ClothingItem, error) {
	return s.repo.AddItem(ctx, userID, req)
}

func (s *WardrobeService) DeleteItem(ctx context.Context, userID, id string) error {
	return s.repo.DeleteItem(ctx, id)
}

func (s *WardrobeService) GetCategories(ctx context.Context, userID string) (map[string]int, error) {
	return s.repo.GetCategories(ctx, userID)
}
