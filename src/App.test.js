import { fireEvent, render, screen } from '@testing-library/react';
import LandingPage from './features/landing/LandingPage';

test('renders auction cards and lets visitors pause the AI concept preview', () => {
  render(<LandingPage sessionReady user={null} onAuthenticated={() => {}} onLogout={() => {}} />);

  expect(screen.getByRole('heading', { name: /keep every bid visible/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /club/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/AI auction assistant concept preview/i)).toBeInTheDocument();

  const previewButton = screen.getByRole('button', { name: /pause preview/i });
  fireEvent.click(previewButton);

  expect(screen.getByRole('button', { name: /play preview/i })).toHaveAttribute('aria-pressed', 'false');
});
