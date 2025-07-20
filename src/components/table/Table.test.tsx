import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Table from './Table';
import { vi } from 'vitest';
import { searchKey } from '../../utils/Constants';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Mock PokeAPI response
const mockPokemons = {
  results: [
    { name: 'Pikachu', url: 'url1' },
    { name: 'Bulbasaur', url: 'url2' },
    { name: 'Charmander', url: 'url3' },
  ],
};

// Mock Server (MSW v2 syntax)
const server = setupServer(
  http.get('https://pokeapi.co/api/v2/pokemon/', () => {
    return HttpResponse.json(mockPokemons);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Table', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders SearchBar and PokemonsGrid', async () => {
    render(<Table />);

    expect(
      screen.getByPlaceholderText(/input pokemons amount/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  });

  test('shows Spinner during loading', async () => {
    render(<Table />);

    // Spinner appears
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Spinner disappears after load
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  test('handles fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<Table />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  test('searches with new limit and stores in localStorage', async () => {
    render(<Table />);

    const input = screen.getByPlaceholderText(
      /input pokemons amount/i
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem(searchKey)).toBe('5');
    });
  });
});
