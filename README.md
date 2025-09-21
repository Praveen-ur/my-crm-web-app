# CRM Pro - Modern Customer Relationship Management

A modern, production-quality CRM frontend built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard** - KPI cards, pipeline overview, recent activity
- **Contacts Management** - Search, filter, create, and manage customer contacts
- **Companies** - Manage company accounts and relationships
- **Deals Pipeline** - Kanban-style deal tracking with drag & drop
- **Activities & Tasks** - Calendar view and task management
- **Reports** - Analytics and insights
- **Settings** - Team management, pipeline configuration

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router
- **State Management**: TanStack Query (react-query)
- **Forms**: React Hook Form + Zod validation
- **Drag & Drop**: @dnd-kit
- **Tables**: TanStack Table with virtualization
- **Testing**: Vitest + React Testing Library + Playwright
- **Mock API**: MSW (Mock Service Worker)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crm-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Default Login Credentials

For development, you can use any email/password combination. The app uses mock authentication.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run storybook` - Start Storybook component library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/             # shadcn/ui components
├── pages/              # Route pages
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── mocks/              # MSW mock handlers and data
```

## Development Guidelines

- Follow the established design system tokens in `src/index.css`
- Use semantic color classes instead of hardcoded colors
- Ensure all components are accessible (ARIA labels, keyboard navigation)
- Write tests for critical business logic
- Use TypeScript strictly - no `any` types

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## API Integration

The app currently uses MSW for mocking API responses. To connect to a real backend:

1. Set the `VITE_API_BASE_URL` environment variable
2. Update the API client in `src/lib/api.ts`
3. Remove or disable MSW handlers

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if needed
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.