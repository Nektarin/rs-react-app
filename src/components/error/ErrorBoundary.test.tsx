import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { vi } from 'vitest';

describe('ErrorBoundary', () => {
  const Fallback = <div>Something went wrong!</div>;

  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={Fallback}>
        <div>Normal Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Content')).toBeInTheDocument();
  });

  test('renders fallback UI when error is thrown', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const ProblemChild = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary fallback={Fallback}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
