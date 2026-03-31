import { RootState } from '../types/state';
import { SortOption } from '../types/options';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

const selectFilteredSortedOffers = createSelector([
  (state: RootState) => state.offers.offersList,
  (_: RootState, cityName: string) => cityName,
  (_: RootState, __: string, activeOption: SortOption) => activeOption
],
(offers, cityName, activeOption) => {
  const filteredOffers = offers.filter(
    (offer) => offer.city.name === cityName,
  );

  switch (activeOption) {
    case 'Popular':
      return filteredOffers;
    case 'Price: high to low':
      return [...filteredOffers].sort((a, b) => b.price - a.price);
    case 'Price: low to high':
      return [...filteredOffers].sort((a, b) => a.price - b.price);
    case 'Top rated first':
      return [...filteredOffers].sort((a, b) => b.rating - a.rating);
    default:
      return filteredOffers;
  }
});

const selectFavoritesByCity = createSelector(
  [(state: RootState) => state.favoriteOffers.favorites],
  (offers) => {
    const grouped: Record<string, Offer[]> = {};

    offers.forEach((offer) => {
      const city = offer.city.name;

      if (!grouped[city]) {
        grouped[city] = [];
      }

      grouped[city].push(offer);
    });

    return grouped;
  }
);

const selectFavoritesCount = createSelector(
  [(state: RootState) => state.offers.offersList],
  (offers) => offers.filter((offer) => offer.isFavorite).length
);

export { selectFilteredSortedOffers, selectFavoritesByCity, selectFavoritesCount };
