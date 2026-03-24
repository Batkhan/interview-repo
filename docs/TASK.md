# Full-Stack Developer Take-Home Task

## Overview

Attira is a fashion-tech app that helps users manage their wardrobe, get outfit recommendations, and try on outfits virtually. This repository contains a subset of the codebase with real patterns from the production app.

**Stack**: React Native + Expo (TypeScript, Zustand) | Go (Chi router, PostgreSQL, SQLC)

This task has **10 progressive challenges** (easy to very hard). Work through as many as you can within **1-2 hours**. Quality matters more than quantity.

---

## Instructions

1. Clone this repository
2. Create a branch named `interview/<your-name>` (e.g., `interview/jane-doe`)
3. Work through the tasks below in order — **commit as you go**
4. When done, push your branch
5. Include a `NOTES.md` file in the repo root with any observations, questions, or things you'd do differently with more time

**Important**: This is a code-only exercise. You do NOT need to run any services locally. Read the existing code, understand the patterns, and write code that fits.

Start by reading the `README.md` to understand the architecture.

---

## Tasks

### Task 1 — Explain Code (5 min) | Easy

**File**: `frontend/services/api/client.ts`

Read the `resolveImageURLs` function (lines 40-55) and the response interceptor that calls it.

**Your task**: Add a JSDoc comment above the `resolveImageURLs` function explaining:
- What it does
- Why it's needed (hint: look at `frontend/config/api.ts` for `resolveImageURL`)

Keep it to 2-3 sentences.

---

### Task 2 — Fix a Type Mismatch (5 min) | Easy

**Files**: Compare `frontend/types/clothing.ts` with `backend/internal/model/clothing.go`

The Go backend `ClothingItem` struct has a `Price` field (`json:"price,omitempty"`), but the frontend TypeScript `ClothingItem` interface is missing it.

**Your task**: Add the `price` field to the frontend `ClothingItem` type. Look at how `omitempty` in the Go struct tells you whether the field should be required or optional in TypeScript.

---

### Task 3 — Add a UI Component (10 min) | Easy-Medium

**Reference**: `frontend/components/ui/Button.tsx`

**Your task**: Create a new `Badge` component at `frontend/components/ui/Badge.tsx`.

Requirements:
- Small colored label (e.g., "New", "Sale", "3 items")
- Props: `label` (string), `variant` (at least `default` and `accent`)
- Follow the **exact same patterns** as `Button.tsx`:
  - Import theme tokens from `../../theme`
  - Use `StyleSheet.create()` for styles
  - Use `colors`, `typography`, `spacing`, `borderRadius` from theme — no hardcoded values
- Export the `Badge` component and add it to `frontend/components/ui/index.ts`

---

### Task 4 — Add a Store Action (10 min) | Medium

**File**: `frontend/stores/wardrobeStore.ts`

The wardrobe store has items but no way to sort them client-side.

**Your task**: Add sorting capability:
1. Add a `sortMode` field to the store state (`'newest' | 'oldest' | 'name'`)
2. Add a `setSortMode` action that updates `sortMode` and re-sorts the `items` array in place
3. Make sure `fetchItems` also applies the current sort after fetching

Look at how existing actions like `setCategory` work for the pattern.

---

### Task 5 — Go API: Add Pagination (10 min) | Medium

**File**: `backend/internal/handler/wardrobe.go`

The `ListItems` handler returns all wardrobe items at once. For users with large wardrobes, this is inefficient.

**Your task**: Add `limit` and `offset` query parameters to the `ListItems` handler:
- Parse `limit` and `offset` from the query string (default: `limit=50`, `offset=0`)
- Pass them through to the service call
- Look at how `helpers.go` provides `queryInt()` for parsing integer query params

Note: You only need to modify the handler — you don't need to update the service/repository.

---

### Task 6 — Write a SQL Query (15 min) | Medium-Hard

**Reference**: `backend/db/queries/wardrobe.sql`

This file contains SQLC query definitions. Look at the existing queries to understand the annotation format (`-- name: QueryName :many/:one/:exec`).

**Your task**: Add a new query `GetWardrobeStats` to the same file that returns, for a given user:
- Total number of wardrobe items
- Number of items per category
- The most recently added item's `created_at` timestamp

Write it as a single SQL query with the proper SQLC annotation.

---

### Task 7 — Fix Missing Error Handling (10 min) | Medium-Hard

**File**: `frontend/stores/wardrobeStore.ts`

Look at the `addItem` action (lines 48-53) and compare it to `fetchItems` (lines 29-37).

**Your task**:
1. Identify the error handling gap in `addItem` (and `deleteItem`)
2. Fix both actions to handle errors properly, following the same pattern as `fetchItems`
3. Add a brief comment explaining what would happen to the user without this fix

---

### Task 8 — Full Frontend Integration (15 min) | Hard

**Reference**: Look at the pattern across these files:
- `frontend/types/clothing.ts` — type definitions
- `frontend/services/api/wardrobe.ts` — API service
- `frontend/hooks/useWardrobe.ts` — custom hook

**Your task**: Create a complete `stats` feature following the existing patterns:

1. **Type** (`frontend/types/stats.ts`): Define a `UserStats` type with `total_items` (number), `total_outfits` (number), and `favorite_category` (string)
2. **API Service** (`frontend/services/api/stats.ts`): Create a `statsAPI.getStats()` function that calls `GET /user/stats`. Follow the exact pattern in `wardrobe.ts`
3. **Hook** (`frontend/hooks/useStats.ts`): Create a `useStats` hook that fetches stats on mount and returns `{ stats, isLoading, error }`. Follow the pattern in `useWardrobe.ts`
4. **Export**: Add the new type to `frontend/types/index.ts`

---

### Task 9 — Architecture Proposal (10 min) | Hard

**Context**: Read the "AI Stylist Chat" section in `README.md`.

The stylist chat currently sends the full conversation history with every API request. As conversations grow, this becomes expensive (token costs) and slow.

**Your task**: Create a `PROPOSAL.md` file in the repo root. Write a short proposal (max 200 words) for how you'd optimize this. Consider:
- Where should conversation history live?
- How do you handle the AI model's token limit?
- What trade-offs does your approach have?

---

### Task 10 — Design a Feature (15 min) | Very Hard

**Context**: Read the "Outfit Recommendations" section in `README.md`.

**Your task**: Add a second section to your `PROPOSAL.md` designing an "Outfit of the Day" feature.

The idea: Each day, the app highlights one personalized outfit for the user based on their wardrobe. Cover:
- Where does the recommendation come from? (consider the existing recommendation system described in the README)
- What new Go endpoint would you add? Write the handler function signature
- What new frontend hook would you create? Write the hook signature and return type
- How would you handle edge cases (too few items, user already dismissed today's outfit)?

Show your thinking. We're looking for how you reason about systems, not perfect code.

---

## Time Guide

| Task | Est. Time | Difficulty |
|------|-----------|-----------|
| 1 | 5 min | Easy |
| 2 | 5 min | Easy |
| 3 | 10 min | Easy-Medium |
| 4 | 10 min | Medium |
| 5 | 10 min | Medium |
| 6 | 15 min | Medium-Hard |
| 7 | 10 min | Medium-Hard |
| 8 | 15 min | Hard |
| 9 | 10 min | Hard |
| 10 | 15 min | Very Hard |
| **Total** | **~105 min** | |

---

## What We're Looking For

- **Pattern matching**: Do you follow the existing codebase conventions, or invent your own?
- **Problem-solving**: How do you approach unfamiliar code?
- **Communication**: Are your comments, proposals, and NOTES.md clear?
- **Git hygiene**: Logical commits with meaningful messages
- **Quality over quantity**: 6 well-done tasks beats 10 sloppy ones

Good luck!
