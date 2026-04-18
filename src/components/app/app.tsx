import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAuthAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersActions } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const user = useAppSelector((state) => state.user.user);
  const favoritesCount = useAppSelector((state) => state.favoriteOffers.favorites).length;

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersActions());
    }
  }, [authorizationStatus, dispatch]);

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus} email={user?.email} favoritesCount={favoritesCount}/>}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute><FavoritesPage /></PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={AppRoute.NotFound} replace />}/>
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
