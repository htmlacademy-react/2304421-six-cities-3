import LocationsList from './locations-list/locations-list';
import { getRandomCards } from '../../utils/utils';
import { OPTIONS } from '../../const';
import PlacesOptionItem from './places-option-item';
import { Helmet } from 'react-helmet-async';
import { City } from '../../types/city';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { cityChange } from '../../store/action';

type MainPageProps = {
  cardsCount: number;
};

function MainPage({ cardsCount }: MainPageProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offersList);
  const dispatch = useAppDispatch();


  const activeOption: (typeof OPTIONS)[number] = 'Popular';

  const currentOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === currentCity.name),
    [offers, currentCity],
  );

  const cards = useMemo(
    () => getRandomCards(currentOffers, cardsCount),
    [currentOffers, cardsCount],
  );

  const handleCityChange = (city: City) => {
    dispatch(cityChange(city));
  };

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsList
          currentCity={currentCity}
          onCityChange={handleCityChange}
        />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {currentOffers.length} places to stay in {currentCity.name}
            </b>
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
              <OffersList offers={cards} onHover={setActiveCardId} />
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              city={currentCity}
              offers={cards}
              className="cities__map map"
              activeOfferId={activeCardId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
