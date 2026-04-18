import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const emptyContainerTestId = 'empty-container';
    const mockCityName = 'Paris';
    const expectedParText = 'We could not find any property available at the moment in Paris';
    const expectedBText = 'No places to stay available';

    render(<MainEmpty cityName={mockCityName}/>);

    expect(screen.getByTestId(emptyContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedParText)).toBeInTheDocument();
    expect(screen.getByText(expectedBText)).toBeInTheDocument();
  });
});
