# RIT Smart Assistant
The assistant is a free, deterministic local website feature. It requires no AI key, billing account, external model, or network request. Questions are normalized and matched against typed bilingual entries in `data/assistant-knowledge.ts` plus published website content. Unknown questions return a safe fallback rather than an invented answer.

To maintain it, add verified English and Bangla keywords, questions, answers and related URLs to the knowledge file. Keep answers limited to published information. The API validates input, limits messages to 500 characters, and applies lightweight in-process rate limiting. For multi-instance high-traffic deployment, replace this limiter with a shared store.
