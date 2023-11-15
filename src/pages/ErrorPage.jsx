import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h2>Oops</h2>
      <p>Sorry, an unexpected error has occured</p>
      <p>
        <i>
          Error:
          {' '}
          {error?.statusText || error?.message}
        </i>
      </p>
    </div>
  );
}

export default ErrorPage;
