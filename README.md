# GRAINZ Website

A modern, responsive website for GRAINZ built with React, TypeScript, and Tailwind CSS.

## Features

- 🚀 Built with Vite for fast development and building
- ⚡ TypeScript for type safety
- 🎨 Tailwind CSS for utility-first styling
- 📱 Fully responsive design
- 🌊 Interactive wave animations
- 🎯 SEO optimized
- 📦 Component-based architecture

## Pages

- **Home**: Main landing page with animated background and team showcase
- **Content Hub**: Blog/article listing page
- **Blog Detail**: Individual article view
- **404**: Custom not found page

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Radix UI Components
- Lucide Icons

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   ├── ErrorBoundary.tsx
│   ├── Navbar.tsx
│   ├── OutlineButton.tsx
│   ├── TeamPhotos.tsx
│   └── WorksWith.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── index.css          # Global styles

public/
├── brands/             # Brand logos
├── portfolio/          # Portfolio images
├── team/              # Team member photos
└── grainz-logo.png    # Main logo
```

## Deployment

The project is configured for easy deployment on Vercel. Simply push to your repository and connect it to Vercel.

## License

All rights reserved © 2026 GRAINZ
