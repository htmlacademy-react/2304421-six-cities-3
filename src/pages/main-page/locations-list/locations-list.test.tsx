import { render, screen } from '@testing-library/react';
import LocationsList from './locations-list';
import { mockCity } from '../../../mockTestData';
import { CITIES } from '../../../const';
import { withHistory } from '../../../utils/mock-component-with-history';

describe('Component: LocationsList', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<LocationsList currentCity={mockCity} onCityChange={vi.fn()}/>);

    render(preparedComponent);

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });
});
