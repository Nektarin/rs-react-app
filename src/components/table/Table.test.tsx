import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Table from './Table';
import { vi } from 'vitest';
import { searchKey } from '../../utils/Constants';
import { http, HttpResponse } from 'msw';
import { server } from '../../test-utils/server';

describe('Table', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders SearchBar and PokemonsGrid', async () => {
    render(<Table />);
    expect(
      screen.getByPlaceholderText(/input pokemons amount/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });

  test('shows Spinner during loading', async () => {
    render(<Table />);
    expect(screen.getByRole('status')).toBeInTheDocument();

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
