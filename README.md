# Resume Builder Application

## Purpose

The objective is to create a resume builder application that mimics a progressive profile completion flow. Instead of filling out all information at once, the system should ask candidates questions step-by-step and dynamically build their resume.

## Getting Started

### Prerequisites

- Node.js >= 22.16.x
- pnpm (package manager)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Build

Build the application for production:

```bash
pnpm build
```

### Testing

Run tests:

```bash
pnpm test
```

Run tests with UI:

```bash
pnpm test:ui
```

### Linting and Formatting

Check code formatting and linting:

```bash
pnpm biome:check
```

Auto-fix formatting and linting issues:

```bash
pnpm biome:fix
```

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **TanStack Router** - File-based routing
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **Vite** - Build tool and dev server
- **Biome** - Linting and formatting
- **Husky** - Git hooks
- **Vitest** - Testing framework

## Project Structure

```
src/
├── routes/              # TanStack Router routes (file-based routing)
├── lib/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   └── layout/         # Layout components
└── main.tsx            # Application entry point
```