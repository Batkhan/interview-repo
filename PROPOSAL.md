Right now the app is sending the entire chat history with every message, which is not efficient because the amount of text keeps increasing. This makes responses slower and also increases cost since the AI charges based on how much text is sent.

A better approach would be to keep all conversation history in the backend database instead of sending it from the frontend every time. When a new message comes in, the backend can fetch the previous messages and manage what gets sent to the AI.

To handle token limits, I would introduce a system where older messages are summarized once the conversation becomes long. That summary can be stored and reused, and for each new request we send the summary along with only the most recent few messages. This keeps the context while reducing the total amount of text.

The trade off here is that we add a bit more complexity on the backend, and summaries might lose some minor details. But overall, it significantly improves performance and reduces cost while still maintaining good conversation quality.
