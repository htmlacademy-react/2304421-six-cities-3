import { State } from '../types/state';
import { SortOption } from '../types/options';
import { createSelector } from '@reduxjs/toolkit';

const selectFilteredSortedOffers = createSelector([
  (state: State) => state.offersList,
  (_: State, cityName: string) => cityName,
  (_: State, __: string, activeOption: SortOption) => activeOption
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

export { selectFilteredSortedOffers };
