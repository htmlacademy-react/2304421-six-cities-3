import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const mockImgUrl = 'img/logo.svg';
    const imgContainerTestId = 'img-container';
    const mockAltText = '6 cities logo';

    render(<Footer />);

    expect(screen.getByTestId(imgContainerTestId)).toBeInTheDocument();
    const image = screen.getByAltText(mockAltText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImgUrl);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'main.html');
  });
});
