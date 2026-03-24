package handler

import (
	"net/http"

	"interview-repo/internal/middleware"
	"interview-repo/internal/model"
	"interview-repo/internal/service"

	"github.com/go-chi/chi/v5"
)

type WardrobeHandler struct {
	svc *service.WardrobeService
}

func NewWardrobeHandler(svc *service.WardrobeService) *WardrobeHandler {
	return &WardrobeHandler{svc: svc}
}

func (h *WardrobeHandler) ListItems(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	category := r.URL.Query().Get("category")
	items, err := h.svc.ListItems(r.Context(), userID, category)
	if err != nil {
		respondInternalError(w, err)
		return
	}
	respondJSON(w, http.StatusOK, items)
}

func (h *WardrobeHandler) GetItem(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	id := chi.URLParam(r, "id")
	item, err := h.svc.GetItem(r.Context(), userID, id)
	if err != nil {
		respondInternalError(w, err)
		return
	}
	respondJSON(w, http.StatusOK, item)
}

func (h *WardrobeHandler) AddItem(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	var req model.AddItemRequest
	if err := parseJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	item, err := h.svc.AddItem(r.Context(), userID, req)
	if err != nil {
		respondInternalError(w, err)
		return
	}
	respondJSON(w, http.StatusCreated, item)
}

func (h *WardrobeHandler) DeleteItem(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	id := chi.URLParam(r, "id")
	if err := h.svc.DeleteItem(r.Context(), userID, id); err != nil {
		respondInternalError(w, err)
		return
	}
	respondJSON(w, http.StatusOK, map[string]string{"message": "item deleted"})
}

func (h *WardrobeHandler) GetCategories(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	cats, err := h.svc.GetCategories(r.Context(), userID)
	if err != nil {
		respondInternalError(w, err)
		return
	}
	respondJSON(w, http.StatusOK, cats)
}
