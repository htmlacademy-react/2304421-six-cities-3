import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';
import { withStore } from '../../utils/mock-component-with-store';

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {
    const expectedText = 'Error';
    const { withStoreComponent} = withStore(<ErrorMessage />, {
      error: {
        error: expectedText,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
