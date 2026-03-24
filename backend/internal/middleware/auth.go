package middleware

import "context"

type contextKey string

const userIDKey contextKey = "userID"

// GetUserID extracts the authenticated user's ID from the request context.
// In production, this is set by the auth middleware after validating the Firebase JWT.
func GetUserID(ctx context.Context) string {
	if id, ok := ctx.Value(userIDKey).(string); ok {
		return id
	}
	return ""
}
