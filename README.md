# Pokemon Explorer

Welcome to Pokemon Explorer/Pokedex using React and the [PokeAPI](https://pokeapi.co/)! The PokeAPI provides an extensive REST API for fetching Pokémon data.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS with custom color palette
- **State Management**: React Context API
- **Data Fetching**: TanStack Query (React Query)
- **Testing**: Jest + React Testing Library
- **Icons**: React Icons
- **Font**: Geist Sans (local font)

## Features Implemented

### Core Features
- Responsive Pokémon explorer with pagination and infinite scroll
- Client-side search and filtering
- Advanced sorting options (ID, Name, Base Experience)
- Type-based filtering with color-coded badges
- Detailed Pokémon information pages
- Loading states and error handling
- Accessibility features (ARIA labels, keyboard navigation)

### UI Components
- Loading spinner with accessibility support
- Scroll to top button
- Search bar with icon
- Sort and filter controls with clear option
- Responsive Pokemon cards with hover effects
- Custom gradient navigation bar

### Performance Optimizations
- Image lazy loading
- Infinite scroll with intersection observer
- Query caching with TanStack Query
- Client-side routing
- Fallback image chain

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/hariharan290496/pokemon-explorer-app.git
```

### 2. Install Dependencies

Using `pnpm` (recommended):

```bash
pnpm install
```

### 3. Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm test       # Run tests
pnpm lint       # Run linting
```

## Project Structure

```
src/
├── app/                  # Next.js app directory
├── components/          
│   ├── common/          # Reusable components
│   ├── PokemonCard/     # Pokemon card component
│   ├── PokemonDetail/   # Pokemon detail view
│   ├── PokemonList/     # Main pokemon list
│   └── Providers/       # App providers
├── context/             # React Context
├── utils/               # Utility functions
└── styles/              # Global styles
```

## Testing

The project uses Jest and React Testing Library for testing. Tests cover:
- Component rendering
- User interactions
- State management
- Accessibility
- Error states
- Loading states

## Styling

- Tailwind CSS for utility-first styling
- Custom color system for Pokemon types
- Responsive design with mobile-first approach
- CSS custom properties for theming
- Custom gradient effects

## Best Practices

- Component-based architecture
- Proper error boundaries
- Loading states for better UX
- Accessibility compliance
- Comprehensive test coverage
- Clean code principles
- Type-safe color system
- Proper file organization

## Evaluation Criteria

- **Code Quality**: Clean code practices, meaningful variable names, and proper comments
- **Responsiveness**: Mobile-first design approach
- **Functionality**: All features working as expected
- **Best Practices**: React patterns and component organization
- **Testing**: Comprehensive test coverage
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized loading and rendering
