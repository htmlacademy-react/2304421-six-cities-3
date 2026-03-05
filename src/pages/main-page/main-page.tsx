import LocationsList from './locations-list/locations-list';
import { Helmet } from 'react-helmet-async';
import { City } from '../../types/city';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { cityChange } from '../../store/action';
import PlacesOptions from './places-options/places-options';
import { shuffleArray } from '../../utils/utils';
import { SortOption } from '../../types/options';

type MainPageProps = {
  cardsCount: number;
};

function MainPage({ cardsCount }: MainPageProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<SortOption>('Popular');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offersList);
  const dispatch = useAppDispatch();

  const currentOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === currentCity.name),
    [offers, currentCity],
  );

  const sortedOffers = useMemo(() => {
    switch (activeOption) {
      case 'Popular':
        return shuffleArray(currentOffers);
      case 'Price: high to low':
        return [...currentOffers].sort((a, b) => b.price - a.price);
      case 'Price: low to high':
        return [...currentOffers].sort((a, b) => a.price - b.price);
      case 'Top rated first':
        return [...currentOffers].sort((a, b) => b.rating - a.rating);
      default:
        return currentOffers;
    }
  }, [currentOffers, activeOption]);

  const cards = useMemo(
    () => sortedOffers.slice(0, cardsCount),
    [sortedOffers, cardsCount],
  );

  const handleCityChange = (city: City) => {
    dispatch(cityChange(city));
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
              {currentOffers.length} places to stay in {currentCity.name}
            </b>
            <PlacesOptions activeOption={activeOption} onOptionChange={handleSortChange} isOpen={isOpen} onSortingToggle={handleSortingToggle}/>
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
