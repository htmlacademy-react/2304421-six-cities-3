import LocationsList from './locations-list/locations-list';
import { Helmet } from 'react-helmet-async';
import { City } from '../../types/city';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setCity } from '../../store/action';
import OffersSorting from './offers-sorting/offers-sorting';
import { SortOption } from '../../types/options';
import { selectFilteredSortedOffers } from '../../store/selectors';

type MainPageProps = {
  cardsCount: number;
};

function MainPage({ cardsCount }: MainPageProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<SortOption>('Popular');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentCity = useAppSelector((state) => state.city);
  const filteredSortedOffers = useAppSelector((state) => selectFilteredSortedOffers(state, state.city.name, activeOption));
  const dispatch = useAppDispatch();
  const visibleOffers = filteredSortedOffers.slice(0, cardsCount);

  const handleCityChange = (city: City) => {
    dispatch(setCity(city));
  };

  const handleSortChange = (option: SortOption) => {
    setActiveOption(option);
    setIsOpen(false);
  };

  const handleSortingToggle = () => {
    setIsOpen((prev) => !prev);
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
              {selectFilteredSortedOffers.length} places to stay in {currentCity.name}
            </b>
            <OffersSorting activeOption={activeOption} onOptionChange={handleSortChange} isOpen={isOpen} onSortingToggle={handleSortingToggle}/>
            <div className="cities__places-list places__list tabs__content">
              <OffersList offers={visibleOffers} onHover={setActiveCardId} />
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              city={currentCity}
              offers={visibleOffers}
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
