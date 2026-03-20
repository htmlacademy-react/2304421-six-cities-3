import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAuthAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus}/>}>
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
