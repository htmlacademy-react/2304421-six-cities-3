import { render, screen } from '@testing-library/react';
import OffersSorting from './offers-sorting';

describe('Component: OffersSorting', () => {
  it('should render correctly', () => {
    const mockOption = 'Popular';
    const expectedText = 'Sort by';

    render(
      <OffersSorting
        activeOption={mockOption}
        onOptionChange={vi.fn()}
        isOpen={false}
        onSortingToggle={vi.fn()}
      />,
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByText(mockOption)).toHaveLength(2);
    expect(screen.getByRole('button', { name: /popular/i })).toBeInTheDocument();

  });
});
