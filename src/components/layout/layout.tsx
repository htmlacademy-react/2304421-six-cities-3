import Header from '../header/header';
import { Outlet, useLocation } from 'react-router-dom';

function Layout(): JSX.Element {
  const location = useLocation();

  let pageClass = 'page';

  if (location.pathname === '/') {
    pageClass += ' page--gray page--main';
  }

  return (
    <div className={pageClass}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
