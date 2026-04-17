import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const containerTestId = 'spinner-container';

    render(<Spinner />);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
  });
});
