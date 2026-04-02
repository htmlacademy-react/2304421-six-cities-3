import Footer from '../../components/footer/footer';
import FavoritesPageItem from './favorites-page-item';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { selectFavoritesByCity } from '../../store/selectors';
import { useFavorite } from '../../hooks/useFavorite';

function FavoritesPage(): JSX.Element {
  const favoritesByCity = useAppSelector(selectFavoritesByCity);
  const handleToggleFavoriteClick = useFavorite();
  const isEmpty = Object.keys(favoritesByCity).length === 0;

  return (
    <>
      <main className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}>
        <Helmet>
          <title>Favorites page</title>
        </Helmet>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(([cityName, offers]) => (
                  <FavoritesPageItem
                    key={cityName}
                    city={offers[0].city}
                    offers={offers}
                    onFavoriteToggleClick={handleToggleFavoriteClick}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FavoritesPage;
