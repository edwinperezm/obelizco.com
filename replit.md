# Project Overview

## Current Status
Migration from Figma to Replit environment in progress.

## Project Architecture
Full-stack JavaScript application with:
- Frontend: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- Backend: Express.js + TypeScript
- Database: PostgreSQL with Drizzle ORM
- Routing: Wouter for client-side routing
- State Management: TanStack Query for server state
- Styling: Tailwind CSS with dark mode support

## User Preferences
(To be documented as preferences are expressed)

## Recent Changes
- Migration from Figma to Replit environment completed successfully
- Functional carousel with 6 images implemented in CallToActionSection
- HeaderSection updated with proper image elements and placeholder system
- Placeholder API endpoint created for development images
- Progress tracker completed at `.local/state/replit/agent/progress_tracker.md`
- Node.js 20 runtime confirmed installed
- Express server running on port 5000
- Vite development server connected
- CSS blend mode system implemented with reusable classes
- FeaturesSection background image differentiated from HeaderSection images
- Background blend effects using CSS classes instead of inline styles

## Development Notes
- Using modern full-stack JS patterns with client/server separation
- Security practices implemented with proper authentication patterns
- All packages already installed via package.json
- CSS blend mode classes available: .blend-darker, .blend-hue, .blend-color-burn, .blend-multiply, .bg-image-overlay
- Background effects using CSS classes for consistency and maintainability