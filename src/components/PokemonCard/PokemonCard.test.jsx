import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import PokemonCard from './PokemonCard';

// Mock next/navigation and next/image
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />
  },
}));

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    types: [
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ],
    sprites: {
      other: {
        'official-artwork': {
          front_default: '/bulbasaur.png'
        }
      }
    }
  };

  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockImplementation(() => mockRouter);
  });

  afterEach(cleanup);

  it('renders pokemon name correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('renders pokemon types', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    mockPokemon.types.forEach(({ type }) => {
      expect(screen.getByText(type.name)).toBeInTheDocument();
    });
  });

  it('navigates to pokemon detail page when clicked', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const card = screen.getByRole('link');
    expect(card).toHaveAttribute('href', '/pokemon/1');
  });

  it('applies correct CSS classes to card container', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const card = screen.getByRole('link');
    expect(card).toHaveClass('bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1');
  });

  it('applies correct CSS classes to type badges', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const typeBadges = screen.getAllByText(/grass|poison/);
    typeBadges.forEach(badge => {
      expect(badge).toHaveClass('px-3 py-1 rounded-full text-sm text-white');
    });
  });

  
});
