function NotFoundPage(): JSX.Element {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/">Go home</a>
      </div>
    </main>
  );
}

export default NotFoundPage;
