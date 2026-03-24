# Attira — Interview Codebase

This is a subset of the Attira codebase, a fashion-tech app for managing wardrobes, getting outfit recommendations, and virtual try-on.

## Tech Stack

### Frontend (`frontend/`)
- **React Native + Expo Router** — cross-platform (iOS, Android, Web)
- **TypeScript** (strict mode)
- **Zustand** — lightweight state management
- **Axios** — HTTP client with interceptors for auth, retries, and image URL resolution
- **Design System** — centralized theme tokens in `theme/` (colors, typography, spacing)

### Backend (`backend/`)
- **Go** — Chi router, `net/http` handlers
- **PostgreSQL** — primary database
- **SQLC** — type-safe SQL code generation (queries in `db/queries/`)
- **Repository Pattern** — interface-based data access for testability

## Architecture Overview

```
Frontend                          Backend
┌──────────────┐                 ┌──────────────┐
│ Hooks        │ ← uses ←       │ Handler      │ ← HTTP
│ (useWardrobe)│                 │ (wardrobe.go)│
├──────────────┤                 ├──────────────┤
│ Stores       │ ← calls →      │ Service      │
│ (zustand)    │                 │ (business    │
├──────────────┤                 │  logic)      │
│ API Services │ ── HTTP ──→    ├──────────────┤
│ (wardrobe.ts)│                 │ Repository   │
├──────────────┤                 │ (interfaces) │
│ Types        │                 ├──────────────┤
│ (clothing.ts)│                 │ SQLC Queries │
└──────────────┘                 └──────────────┘
```

## Key Patterns

### Frontend
- **API calls**: Always unwrap `data.data` (see `wardrobe.ts`)
- **Stores**: Zustand with `set`/`get` pattern (see `wardrobeStore.ts`)
- **Hooks**: Thin wrappers that call store on mount (see `useWardrobe.ts`)
- **UI components**: Use `StyleSheet.create()` + theme tokens, never hardcoded values (see `Button.tsx`)
- **Error handling**: Use `friendlyError()` to map raw errors to user-facing messages

### Backend
- **Handlers**: Parse request → call service → respond with JSON (see `wardrobe.go`)
- **Response format**: `{ "success": true, "data": {...} }` or `{ "success": false, "error": "..." }`
- **Query helpers**: `queryInt()`, `queryPage()` for parsing URL params (see `helpers.go`)
- **Auth**: `middleware.GetUserID(r.Context())` extracts authenticated user

## Systems Not Included (Referenced in Tasks 9-10)

### AI Stylist Chat
The app has an AI-powered stylist chatbot. The frontend sends the full conversation history with each message to the backend, which forwards it to Google's Gemini API for response generation. Messages are stored in a `stylist_messages` database table. As conversations grow, this becomes expensive (Gemini charges per token) and slow (large payloads).

### Outfit Recommendations
The backend has recommendation and suggestion services that generate outfit combinations from a user's wardrobe items. These use a Python ML service running CLIP embeddings and an Outfit Transformer model to score clothing compatibility. Results are stored in an `outfit_suggestions` table.

### Image Storage
Images are stored in S3-compatible object storage (MinIO locally, Google Cloud Storage in production). The database stores relative paths (e.g., `/ootfits/wardrobe/abc.jpg`), and the frontend `resolveImageURL` function prepends the storage host at fetch time.

## Folder Structure

```
interview-repo/
├── frontend/
│   ├── components/ui/     # Reusable UI components
│   ├── config/            # API configuration
│   ├── hooks/             # Custom React hooks
│   ├── services/api/      # API client + service modules
│   ├── stores/            # Zustand state stores
│   ├── theme/             # Design tokens (colors, typography, spacing)
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── backend/
│   ├── internal/
│   │   ├── handler/       # HTTP handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── model/         # Data models
│   │   ├── repository/    # Data access interfaces
│   │   └── service/       # Business logic
│   └── db/queries/        # SQLC SQL queries
└── docs/
    └── TASK.md            # Your interview tasks
```
