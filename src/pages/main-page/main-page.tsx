import LocationsList from './locations-list/locations-list';
import { getRandomCards } from '../../utils/utils';
import { OPTIONS } from '../../const';
import PlacesOptionItem from './places-option-item';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/types';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { CITIES } from '../../const';

type MainPageProps = {
  cardsCount: number;
  offers: Offer[];
};

function MainPage({ cardsCount, offers }: MainPageProps): JSX.Element {
  const activeOption: (typeof OPTIONS)[number] = 'Popular';
  const currentCity = CITIES[3];
  const currentOffers = offers.filter((offer) => offer.city.name === currentCity.name);
  const cards = getRandomCards(currentOffers, cardsCount);

  return (
    <main className="page__main page__main--index">
      <Helmet><title>Main Page</title></Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsList />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in {currentCity.name}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                {OPTIONS.map((option) => (
                  <PlacesOptionItem
                    key={option}
                    option={option}
                    isActive={option === activeOption}
                  />
                ))}
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList offers={cards} />
            </div>
          </section>
          <div className="cities__right-section">
            <Map city={currentCity} offers={cards} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
