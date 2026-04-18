import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { mockComment } from '../../../mockTestData';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(<ReviewsList comments={[mockComment]} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
  });
});
