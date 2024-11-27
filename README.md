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
- Team management system with CRUD operations
- Evolution chain visualization
- Authentication system with cookie persistence
- Confirmation dialogs for destructive actions
- Success/Error notifications for user actions
- Detailed Pokémon stats with visual indicators
- Multiple sprite variations with image gallery
- Move list with learning methods

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
│   ├── layout.jsx        # Main layout component
│   └── teams/            # Teams page
├── components/           # UI components
│   ├── common/           # Reusable components (e.g., SearchBar, SortFilter, ScrollToTop)
│   ├── EvolutionChain/   # Evolution chain component
│   ├── PokemonCard/      # Pokemon card component
│   ├── PokemonDetail/    # Pokemon detail view
│   ├── PokemonImageGallery/ # Image gallery for Pokemon sprites
│   ├── PokemonList/      # Main Pokemon list
│   ├── Providers/        # App providers (Auth, Team, Pokemon)
│   └── TeamCard/         # Team card component
├── context/              # React Context
│   ├── AuthContext.jsx   # Authentication context
│   ├── TeamContext.jsx   # Team management context
│   └── PokemonContext.jsx # Pokemon data context
├── hooks/                # Custom hooks
│   ├── useEvolutionChain.js # Hook for fetching evolution chain
│   └── usePokemonDetails.js # Hook for fetching Pokemon details
├── services/             # API services
│   └── pokemonApi.js     # Service for interacting with PokeAPI
├── styles/               # Global styles
└── utils/                # Utility functions and constants
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