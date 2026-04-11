import LocationsList from './locations-list/locations-list';
import { Helmet } from 'react-helmet-async';
import { City } from '../../types/city';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setCity } from '../../store/city/city-slice';
import OffersSorting from './offers-sorting/offers-sorting';
import { SortOption } from '../../types/options';
import { selectFilteredSortedOffers } from '../../store/selectors';
import { fetchOffersAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import { useFavorite } from '../../hooks/useFavorite';
import { useCallback } from 'react';
import MainEmpty from '../../components/main-empty/main-empty';
import { processErrorHandle } from '../../services/process-error-handle';

function MainPage(): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<SortOption>('Popular');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isOffersLoading = useAppSelector(
    (state) => state.offers.isOffersLoading,
  );
  const currentCity = useAppSelector((state) => state.city.city);
  const filteredSortedOffers = useAppSelector((state) =>
    selectFilteredSortedOffers(state, currentCity.name, activeOption),
  );
  const dispatch = useAppDispatch();
  const handleToggleFavoriteClick = useFavorite();
  const isOffersNotAvailable = filteredSortedOffers.length === 0;

  useEffect(() => {
    dispatch(fetchOffersAction()).then((result) => {
      if (fetchOffersAction.rejected.match(result)) {
        processErrorHandle(dispatch, result.payload ?? 'Unknown error');
      }
    });
  }, [dispatch]);

  const handleCityChange = useCallback(
    (city: City) => {
      dispatch(setCity(city));
    },
    [dispatch],
  );

  const handleSortChange = useCallback(
    (option: SortOption) => {
      setActiveOption(option);
      setIsOpen(false);
    },
    [setActiveOption, setIsOpen],
  );

  const handleSortingToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const handleOfferHover = useCallback((id: string | null) => {
    setActiveCardId(id);
  }, []);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <main
      className={`page__main page__main--index ${isOffersNotAvailable ? 'page__main--index-empty' : ''}`}
    >
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
      {isOffersNotAvailable ? (
        <MainEmpty cityName={currentCity.name} />
      ) : (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredSortedOffers.length} {filteredSortedOffers.length === 1 ? 'place' : 'places'} to stay in {currentCity.name}
              </b>
              <OffersSorting
                activeOption={activeOption}
                onOptionChange={handleSortChange}
                isOpen={isOpen}
                onSortingToggle={handleSortingToggle}
              />
              <div className="cities__places-list places__list tabs__content">
                {isOffersLoading ? (
                  <Spinner />
                ) : (
                  <OffersList
                    offers={filteredSortedOffers}
                    onHover={handleOfferHover}
                    onFavoriteToggleClick={handleToggleFavoriteClick}
                  />
                )}
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                city={currentCity}
                offers={filteredSortedOffers}
                className="cities__map map"
                activeOfferId={activeCardId}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MainPage;
