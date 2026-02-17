import Footer from '../../components/footer/footer';
import FavoritePageItem from './favorites-page-item';
import { CITIES } from '../../const';
import { getRandomCards, getRandomUniqueInteger } from '../../utils/utils';
import { mockData } from '../../mock-data/mock-data';
import { Helmet } from 'react-helmet-async';

function FavoritesPage(): JSX.Element {

  const itemsCount = getRandomUniqueInteger(1, CITIES.length);
  const randomCities = getRandomCards(CITIES, itemsCount);

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
              {randomCities.map((city) => (
                <FavoritePageItem
                  key={city.name}
                  city={city}
                  offers={getRandomCards(mockData, getRandomUniqueInteger(1, 5))}
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
