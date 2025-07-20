import { render, screen } from '@testing-library/react';
import PokemonsGrid from './PokemonsGrid';

describe('PokemonsGrid', () => {
  test('renders table headers', () => {
    render(<PokemonsGrid pokemons={[]} />);

    expect(screen.getByText(/Index/i)).toBeInTheDocument();
    expect(screen.getByText(/Pokemon Name/i)).toBeInTheDocument();
  });

  test('renders list of pokemons', () => {
    const pokemons = ['Pikachu', 'Bulbasaur', 'Charmander'];

    render(<PokemonsGrid pokemons={pokemons} />);

    pokemons.forEach((name, index) => {
      expect(screen.getByText(`Pokemon - ${index + 1}`)).toBeInTheDocument();
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('renders empty table body when pokemons is empty', () => {
    const { container } = render(<PokemonsGrid pokemons={[]} />);

    const tbody = container.querySelector('tbody');
    expect(tbody?.childElementCount).toBe(0);
  });
});
