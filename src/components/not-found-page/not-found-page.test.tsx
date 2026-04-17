import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { withHistory } from '../../utils/mock-component-with-history';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404';
    const expectedParagraphText = 'Page not found';
    const expectedLinkText = 'Go home';

    render(withHistory(<NotFoundPage />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedParagraphText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
