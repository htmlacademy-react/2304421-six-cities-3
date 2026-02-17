import '../../../markup/css/404-page.css';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <main className="not-found">
      <Helmet><title>Page is not found 😕</title></Helmet>
      <div className="not-found__content">
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/">Go home</a>
      </div>
    </main>
  );
}

export default NotFoundPage;
