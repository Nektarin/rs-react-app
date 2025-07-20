import { render, screen } from '@testing-library/react';
import PokemonRaw from './PokemonRaw';

describe('PokemonRaw', () => {
  test('renders the pokemon name and index', () => {
    render(
      <table>
        <tbody>
          <PokemonRaw index={0} name="Pikachu" />
        </tbody>
      </table>
    );

    expect(screen.getByText(/Pokemon - 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
