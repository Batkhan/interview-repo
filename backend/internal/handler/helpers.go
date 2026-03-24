package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"strconv"

	"interview-repo/internal/model"
)

func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(model.APIResponse{Success: true, Data: data})
}

func respondError(w http.ResponseWriter, status int, message string) {
	if status >= 500 {
		slog.Error("server error", "status", status, "error", message)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(model.APIResponse{Success: false, Error: message})
}

// respondInternalError logs the real error server-side and sends a generic
// message to the client, preventing internal details from leaking.
func respondInternalError(w http.ResponseWriter, err error) {
	slog.Error("server error", "status", 500, "error", err.Error())
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(model.APIResponse{Success: false, Error: "internal error"})
}

func parseJSON(r *http.Request, v interface{}) error {
	r.Body = http.MaxBytesReader(nil, r.Body, 1<<20) // 1 MB limit
	return json.NewDecoder(r.Body).Decode(v)
}

func queryInt(r *http.Request, key string, defaultVal int) int {
	s := r.URL.Query().Get(key)
	if s == "" {
		return defaultVal
	}
	v, err := strconv.Atoi(s)
	if err != nil {
		return defaultVal
	}
	return v
}

// queryPage returns a validated page number (>= 1).
func queryPage(r *http.Request) int {
	p := queryInt(r, "page", 1)
	if p < 1 {
		return 1
	}
	return p
}
