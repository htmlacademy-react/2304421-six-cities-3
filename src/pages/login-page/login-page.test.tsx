import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory } from '../../utils/mock-component-with-history';
import { withStore } from '../../utils/mock-component-with-store';
import LoginPage from './login-page';
import { AuthorizationStatus } from '../../const';

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    // const expectedHeaderText = 'Sign in';
    const expectedPlaceholderLogin = 'Email';
    const expectedPlaceholderPassword = 'Password';
    const { withStoreComponent } = withStore(<LoginPage />, {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isLoginLoading: false,
        user: null,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedPlaceholderLogin)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedPlaceholderPassword)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'test@mail.com';
    const expectedPasswordValue = '3423Test';
    const { withStoreComponent } = withStore(<LoginPage />, {
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isLoginLoading: false,
        user: null,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
