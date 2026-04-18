import { render, screen } from '@testing-library/react';
import ReviewsItem from './reviews-item';
import { mockComment } from '../../../mockTestData';

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    const mockAltText = 'Reviews avatar';

    render(<ReviewsItem review={mockComment} />);

    const image = screen.getByAltText(mockAltText);
    expect(image).toHaveAttribute('src', mockComment.user.avatarUrl);
    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(mockComment.date).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
      )
    ).toBeInTheDocument();
  });
});
