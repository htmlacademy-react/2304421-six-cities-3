import { useLocation, Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  const location = useLocation();

  const isMainPage = location.pathname === AppRoute.Root;

  return isMainPage ? (
    <div className="header__left">
      <a className="header__logo-link header__logo-link--active" href={AppRoute.Root}>
        <img
          className="header__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={81}
          height={41}
        />
      </a>
    </div>
  ) : (
    <div className="header__left">
      <Link className="header__logo-link" to={AppRoute.Root}>
        <img
          className="header__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={81}
          height={41}
        />
      </Link>
    </div>
  );
}

export default Logo;
