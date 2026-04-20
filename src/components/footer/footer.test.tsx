import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component-with-history';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const mockImgUrl = 'img/logo.svg';
    const imgContainerTestId = 'img-container';
    const mockAltText = '6 cities logo';

    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByTestId(imgContainerTestId)).toBeInTheDocument();
    const image = screen.getByAltText(mockAltText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImgUrl);
  });
});
