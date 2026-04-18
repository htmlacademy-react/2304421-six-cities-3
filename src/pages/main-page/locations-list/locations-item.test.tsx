import { render, screen } from '@testing-library/react';
import LocationsItem from './locations-item';
import { mockCity } from '../../../mockTestData';
import { withHistory } from '../../../utils/mock-component-with-history';

describe('Component: LocationsItem', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(
      <LocationsItem
        city={mockCity}
        isActive
        onClick={vi.fn()}
      />);

    render(preparedComponent);

    expect(screen.getByText(mockCity.name)).toBeInTheDocument();
  });
});
