import { render, screen } from '@testing-library/react';
import OfferInsideItem from './offer-inside-item';

describe('Component: OfferInsideItem', () => {
  it('should render corrently', () => {
    const expectedOption = 'Wi-Fi';

    render(<OfferInsideItem option={expectedOption} />);

    expect(screen.getByText(expectedOption)).toBeInTheDocument();
  });
});
