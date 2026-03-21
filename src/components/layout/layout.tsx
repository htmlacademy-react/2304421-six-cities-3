import { Outlet, useLocation, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import './layout.css';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  authorizationStatus: AuthorizationStatus;
  email?: string;
}

function Layout({authorizationStatus, email}: LayoutProps): JSX.Element {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

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

  const handleLogOut = async () => {
    await dispatch(logoutAction());
    navigate(AppRoute.Login);
  };

  const handleLogOutClick = () => {
    handleLogOut();
  };

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
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      {isAuth ? (
                        <>
                          <span className="header__user-name user__name">
                            {email}
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
                      <button
                        className="header__nav-link"
                        onClick={handleLogOutClick}
                      >
                        <span className="header__signout">Sign out</span>
                      </button>
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
