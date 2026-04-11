import { Helmet } from 'react-helmet-async';
import { useRef, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { processErrorHandle } from '../../services/process-error-handle';
import { useMemo } from 'react';
import { getRandomCity } from '../../utils/utils';
import { setCity } from '../../store/city/city-slice';
import { CITIES } from '../../const';
import { useNavigate } from 'react-router-dom';
import './login-page.css';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const isLoginLoading = useAppSelector((state) => state.user.isLoginLoading);
  const isValidPassword = (password: string): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);

  const city = useMemo(() => getRandomCity(CITIES), []);

  const handleButtonClick = () => {
    dispatch(setCity(city));
    navigate(AppRoute.Root);
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const email = loginRef.current.value;
      const password = passwordRef.current.value.trim();

      if (!password) {
        processErrorHandle(dispatch, 'Password must not be empty');
        return;
      }

      if (!isValidPassword(password)) {
        processErrorHandle(dispatch, 'Password must contain at least one letter and one number');
        return;
      }

      dispatch(loginAction({login: email,password})).then((result) => {
        if (loginAction.rejected.match(result)) {
          processErrorHandle(dispatch, result.payload ?? 'Unknown error');
        }
      });
    }
  };

  return (
    <main className="page__main page__main--login">
      <Helmet><title>Login page</title></Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={isLoginLoading}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                disabled={isLoginLoading}
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <button
              className="locations__item-link"
              type="button"
              onClick={handleButtonClick}
            >
              <span>{city.name}</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
