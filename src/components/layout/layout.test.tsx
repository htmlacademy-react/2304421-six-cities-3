import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { withStore } from '../../utils/mock-component-with-store';
import { AuthorizationStatus } from '../../const';
import { withHistory } from '../../utils/mock-component-with-history';

describe('Component: Layout', () => {
  it('should render correctly when user is not authorized', () => {
    const { withStoreComponent } = withStore(
      <Layout
        authorizationStatus={AuthorizationStatus.NoAuth}
        favoritesCount={0}
      />, {}
    );
    const preparedComponent = withHistory(withStoreComponent);
    const mockImgUrl = 'img/logo.svg';
    const imgContainerTestId = 'img-container';
    const mockAltText = '6 cities logo';
    const expectedText = 'Sign in';

    render(preparedComponent);

    expect(screen.getByTestId(imgContainerTestId)).toBeInTheDocument();
    const image = screen.getByAltText(mockAltText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImgUrl);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when user is authorized', () => {
    const mockEmail = 'test@mail.com';
    const { withStoreComponent } = withStore(
      <Layout
        authorizationStatus={AuthorizationStatus.Auth}
        email={mockEmail}
        favoritesCount={0}
      />, {}
    );
    const preparedComponent = withHistory(withStoreComponent);
    const mockImgUrl = 'img/logo.svg';
    const imgContainerTestId = 'img-container';
    const headerAvatarWrapper = 'avatar-wrapper';
    const mockAltText = '6 cities logo';
    const expectedText = 'Sign out';

    render(preparedComponent);

    expect(screen.getByTestId(imgContainerTestId)).toBeInTheDocument();
    const image = screen.getByAltText(mockAltText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImgUrl);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(headerAvatarWrapper)).toBeInTheDocument();
    expect(screen.getByText(mockEmail)).toBeInTheDocument();
  });
});
