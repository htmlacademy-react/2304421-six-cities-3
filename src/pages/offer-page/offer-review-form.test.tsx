import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import OfferReviewForm from './offer-review-form';
import { withStore } from '../../utils/mock-component-with-store';

describe('Component: OfferReviewForm', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferReviewForm />} />
        </Routes>
      </MemoryRouter>,
      {
        comments: {
          comments: [],
          isCommentsLoading: false,
          isPostingComment: false,
          postingComment: '',
          rating: null,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        'Tell how was your stay, what you like and what can be improved'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
