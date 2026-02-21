import PlaceCard from '../../components/place-card/place-card';
import LocationsList from './locations-list/locations-list';
import { getRandomCards } from '../../utils/utils';
import { OPTIONS } from '../../const';
import PlacesOptionItem from './places-option-item';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/types';

type MainPageProps = {
  cardsCount: number;
  offers: Offer[];
};

function MainPage({ cardsCount, offers }: MainPageProps): JSX.Element {
  const cards = getRandomCards(offers, cardsCount);
  const activeOption: (typeof OPTIONS)[number] = 'Popular';

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
            <b className="places__found">312 places to stay in Amsterdam</b>
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
              {cards.map((card) => (
                <PlaceCard key={card.id} variant="vertical" data={card} />
              ))}
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
