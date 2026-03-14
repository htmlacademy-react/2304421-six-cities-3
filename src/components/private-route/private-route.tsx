import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.app.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
