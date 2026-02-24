import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { AuthorizationStatus, AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../../types/types';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppProps = {
  cardsCount: number;
  offers: Offer[];
}

function App({cardsCount, offers}: AppProps): JSX.Element {

  const authorizationStatus = AuthorizationStatus.NoAuth;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus}/>}>
            <Route index element={<MainPage cardsCount={cardsCount} offers={offers} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute authorizationStatus={authorizationStatus}><FavoritesPage offers={offers} /></PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} element={<OfferPage offers={offers} />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
