import { render, screen } from '@testing-library/react';
import OfferImage from './offer-image';

describe('Component: OfferImage', () => {
  it('should render correct', () => {
    const mockImgUrl = 'https://url-to-image/image.png';
    const imgContainerTestId = 'img-container';
    const mockAltText = 'Photo studio';

    render(<OfferImage img={mockImgUrl} alt={mockAltText} />);

    expect(screen.getByTestId(imgContainerTestId)).toBeInTheDocument();
    const image = screen.getByAltText(mockAltText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImgUrl);
  });
});
