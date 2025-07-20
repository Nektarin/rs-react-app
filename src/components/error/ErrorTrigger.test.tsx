import { render, screen, fireEvent } from '@testing-library/react';
import ErrorTrigger from './ErrorTrigger';
import { vi } from 'vitest';

describe('ErrorTrigger', () => {
  test('renders Throw Error button', () => {
    render(<ErrorTrigger />);
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  test('throws error when button is clicked', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<ErrorTrigger />);
      fireEvent.click(screen.getByRole('button', { name: /throw error/i }));
    }).toThrow('Error from ErrorTrigger!');

    consoleErrorSpy.mockRestore();
  });
});
