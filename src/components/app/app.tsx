import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../../const';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppProps = {
  cardsCount: number;
}

function App({cardsCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage cardsCount={cardsCount} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="favorites" element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><FavoritesPage /></PrivateRoute>} />
          <Route path="offer/:id" element={<OfferPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
