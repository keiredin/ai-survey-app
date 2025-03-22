# AI Survey App

A [Next.js](https://nextjs.org) application that uses AI to generate engaging, open-ended survey questions and collects user responses through a simple text input interface. Built with TypeScript, Tailwind CSS, and Grok (via `groq-sdk`), this app offers user authentication and a streamlined survey experience.

## Features

- **User Authentication**: Sign up and sign in with credentials.
- **AI-Powered Questions**: Generate five open-ended survey questions based on a topic using the `llama-3.3-70b-versatile` model from Grok.
- **Simple UI**: Single text input fields for survey responses—no multiple-choice or dropdowns.
- **Theme Toggler**: Single text input fields for survey responses—no multiple-choice or dropdowns.
- **Responsive Design**: Optimized for desktop and mobile with Tailwind CSS and [Geist](https://vercel.com/font) font.

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher (LTS recommended).
- **npm**: Included with Node.js (or use `yarn`, `pnpm`, or `bun`).
- **Grok API Key**: Get one from [xAI](https://x.ai) for question generation.
- **Authentication**: Set up your auth provider (e.g., NextAuth.js) in `lib/auth.ts`.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/keiredin/ai-survey-app.git
   cd ai-survey-app

   ```

2. **Install Dependencies**:

   ```bash
   npm install

   ```

3. **Set Up Environment Variables: Create a .env.local file in the root**:
   ```bash
   GROQ_API_KEY=your-grok-api-key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```
4. **Run the Development Server**:

   ```bash
   npm run dev

    # or

    yarn dev

    # or

    pnpm dev

    # or

    bun dev

   ```

