import Header from '../header/header';
import { Outlet } from 'react-router-dom';

type LayoutProps = {
  className?: string;
}

function Layout({className}: LayoutProps): JSX.Element {
  return (
    <div className={`page ${className ?? ''}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
