import { render, screen } from '@testing-library/react';
import OffersSortingItem from './offers-sorting-item';

describe('Component: OffersSortingItem', () => {
  it('should render correctly', () => {
    const mockOption = 'Popular';

    render(<OffersSortingItem option={mockOption} isActive onClick={vi.fn()}/>);

    expect(screen.getByText(mockOption)).toBeInTheDocument();
  });
});
