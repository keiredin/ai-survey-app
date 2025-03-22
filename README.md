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
   
2. **Install Dependencies**:
    npm install

3. **Set Up Environment Variables: Create a .env.local file in the root**:
    GROQ_API_KEY=your-grok-api-key
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-secret-key
4. **Run the Development Server**: 
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev

    ```







## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
