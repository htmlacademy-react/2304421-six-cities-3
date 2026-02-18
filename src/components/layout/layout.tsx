import { Outlet, useLocation, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';

type LayoutProps = {
  authorizationStatus: AuthorizationStatus;
}

function Layout({authorizationStatus}: LayoutProps): JSX.Element {
  const location = useLocation();

  let pageClass = 'page';
  let logoLinkClass = 'header__logo-link';

  const isMainPage = location.pathname === AppRoute.Root;
  const isLoginPage = location.pathname === AppRoute.Login;

  if (isMainPage) {
    pageClass += ' page--gray page--main';
    logoLinkClass += ' header__logo-link--active';
  }

  if (isLoginPage) {
    pageClass += ' page--gray page--login';
  }

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <div className={pageClass}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className={logoLinkClass} to={AppRoute.Root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            {!isLoginPage && (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      {isAuth ? (
                        <>
                          <span className="header__user-name user__name">
                            Oliver.conner@gmail.com
                          </span>
                          <span className="header__favorite-count">3</span>
                        </>
                      ) : (
                        <span className="header__login">Sign in</span>
                      )}
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    {isAuth && (
                      <Link className="header__nav-link" to={AppRoute.Login}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
