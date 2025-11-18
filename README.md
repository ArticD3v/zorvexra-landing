# Zorvexra Landing
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/ArticD3v/zorvexra-landing)

Zorvexra Landing is a visually striking, single-page application built with Next.js, Tailwind CSS, and TypeScript. It features a unique horizontal scrolling layout with full-screen snapping sections, a dynamic liquid metal background effect, and a modern, dark aesthetic. This project serves as an excellent template for a product or service landing page.

## Key Features

-   **Horizontal Scrolling Experience:** Full-screen sections with smooth-snap scrolling functionality, creating an immersive user journey.
-   **Dynamic Visuals:** An animated "liquid metal" background powered by `@paper-design/shaders-react` provides a captivating visual hook.
-   **Floating Navigation:** A semi-transparent, blurring navigation bar that remains fixed at the top for easy access to all sections.
-   **Rich Component Library:** Leverages shadcn/ui for a comprehensive set of pre-built and customizable components, including a Bento Grid pricing table, shiny buttons, and various form elements.
-   **Interactive Sections:** Includes dedicated, beautifully designed components for a Hero, Features, Pricing, About, and Contact form.
-   **Responsive & Mobile-Friendly:** Adapts gracefully to different screen sizes, with custom hooks and logic for an optimized mobile experience.
-   **Distinctive Typography:** Integrates `Open Sans`, `Rubik`, and `Instrument Serif` fonts for a polished and professional look.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Background Shader:** [@paper-design/shaders-react](https://www.npmjs.com/package/@paper-design/shaders-react)

## Project Structure

The repository is organized as follows:

```
└── articd3v-zorvexra-landing/
    ├── app/                # Next.js App Router: pages and layouts
    │   ├── page.tsx        # Main entrypoint with horizontal scrolling sections
    │   ├── layout.tsx      # Root layout, fonts, and metadata
    │   └── ...
    ├── components/         # Reusable React components
    │   ├── ui/             # Core shadcn/ui components
    │   ├── floating-navbar.tsx
    │   └── liquid-metal-background.tsx
    ├── hooks/              # Custom React hooks
    │   └── use-mobile.ts   # Hook for detecting mobile devices
    ├── lib/                # Utility functions
    └── styles/             # Global styles and Tailwind CSS config
```

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/articd3v/zorvexra-landing.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd zorvexra-landing
    ```

3.  **Install dependencies:**
    This project uses `pnpm`. If you don't have it, install it first (`npm install -g pnpm`).
    ```bash
    pnpm install
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

In the project directory, you can run:

-   `pnpm dev`: Starts the development server.
-   `pnpm build`: Creates a production-ready build of the application.
-   `pnpm start`: Starts the production server.
-   `pnpm lint`: Runs the linter to check for code quality issues.
