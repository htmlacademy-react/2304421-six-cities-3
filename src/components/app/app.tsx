import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAuthAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';

type AppProps = {
  cardsCount: number;
}

function App({cardsCount}: AppProps): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.app.authorizationStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus}/>}>
            <Route index element={<MainPage cardsCount={cardsCount} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute><FavoritesPage /></PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} element={<OfferPage />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
