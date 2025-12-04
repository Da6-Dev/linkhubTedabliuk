<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LinkHub - Bio Social + AI

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`

2. Set up environment variables:
   - Create a `.env` or `.env.local` file.
   - Add your Gemini API Key with the prefix `VITE_` (Required for Vite):
     ```
     VITE_GEMINI_API_KEY=sua_chave_aqui
     ```

3. Run the app:
   `npm run dev`

## Features

- **CounterAPI Integration**: Real-time like counter using official library.
- **Gemini AI**: Auto-generate bios based on keywords.
- **Responsive Design**: Bento grid layout.
