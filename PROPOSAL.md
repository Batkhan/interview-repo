Task 9 : AI Stylist Chat

    Right now the app is sending the entire chat history with every message, which is not efficient because the amount of text keeps increasing. This makes responses slower and also increases cost since the AI charges based on how much text is sent.

    A better approach would be to keep all conversation history in the backend database instead of sending it from the frontend every time. When a new message comes in, the backend can fetch the previous messages and manage what gets sent to the AI.

    To handle token limits, I would introduce a system where older messages are summarized once the conversation becomes long. That summary can be stored and reused, and for each new request we send the summary along with only the most recent few messages. This keeps the context while reducing the total amount of text.

    The trade off here is that we add a bit more complexity on the backend, and summaries might lose some minor details. But overall, it significantly improves performance and reduces cost while still maintaining good conversation quality.

Task 10 : Outfit of the day

    For the “Outfit of the Day” feature, I would reuse the existing outfit recommendation system that already generates outfit combinations using the ML service and stores them in the outfit_suggestions table. Each day, the backend can either fetch a precomputed outfit or generate one if it doesn’t exist.

    On the backend side, I would add a new endpoint like:
    func (h *OutfitHandler) OutfitOfTheDay(w http.ResponseWriter, r *http.Request)

    This handler would get the user ID, check if an outfit is already selected for today, and if not, fetch or generate one from the recommendation system.

    On the frontend, I would create a hook similar to existing ones:
    useOutfitOfTheDay(): { outfit: Outfit | null; isLoading: boolean; error: string | null }

    This hook would call the API on mount and return the outfit data.

    For edge cases, if the user has very few items, instead of blocking them, I would generate a partial outfit and suggest complementary pieces using popular items. If the user dismisses the outfit, I would store that and show an alternative suggestion instead of repeating the same one.
    
    Using popular items can reduce personalization since they may not match the user’s individual preferences.
    This approach also depends on having an up-to-date and relevant popular items dataset, otherwise the suggestions may become outdated or less useful.

