import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { vi } from 'vitest';

describe('SearchBar', () => {
  test('renders input and button', () => {
    const mockClick = vi.fn();

    render(<SearchBar searchText="5" onBtnSearchClick={mockClick} />);

    expect(
      screen.getByPlaceholderText(/input pokemons amount/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    const mockClick = vi.fn();

    render(<SearchBar searchText="5" onBtnSearchClick={mockClick} />);

    const input = screen.getByPlaceholderText(
      /input pokemons amount/i
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '10' } });

    expect(input.value).toBe('10');
  });

  test('calls onBtnSearchClick with current input value', () => {
    const mockClick = vi.fn();

    render(<SearchBar searchText="5" onBtnSearchClick={mockClick} />);

    const input = screen.getByPlaceholderText(
      /input pokemons amount/i
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledWith('15');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('updates state when searchText prop changes', () => {
    const mockClick = vi.fn();

    const { rerender } = render(
      <SearchBar searchText="5" onBtnSearchClick={mockClick} />
    );

    const input = screen.getByPlaceholderText(
      /input pokemons amount/i
    ) as HTMLInputElement;
    expect(input.value).toBe('5');

    rerender(<SearchBar searchText="20" onBtnSearchClick={mockClick} />);
    expect(input.value).toBe('20');
  });
});
