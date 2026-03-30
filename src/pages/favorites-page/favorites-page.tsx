import Footer from '../../components/footer/footer';
import FavoritePageItem from './favorites-page-item';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectFavoritesByCity } from '../../store/selectors';
import { useFavorite } from '../../hooks/useFavorite';
import { useEffect } from 'react';
import { fetchFavoriteOffersActions } from '../../store/api-actions';

function FavoritesPage(): JSX.Element {
  const favoritesByCity = useAppSelector(selectFavoritesByCity);
  const toggleFavorite = useFavorite();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersActions());
  }, [dispatch]);

  return (
    <>
      <main className="page__main page__main--favorites">
        <Helmet>
          <title>Favorites page</title>
        </Helmet>
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCity).map(([cityName, offers]) => (
                <FavoritePageItem
                  key={cityName}
                  city={offers[0].city}
                  offers={offers}
                  onFavoriteToggleClick = {toggleFavorite}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FavoritesPage;
