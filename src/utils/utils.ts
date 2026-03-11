import { mockOffers } from '../mocks/mockOffers';
import { Offer } from '../types/offer';

export function getRandomCards<T>(data: readonly T[], count: number): T[] {
  return [...data].sort(() => Math.random() - 0.5).slice(0, count);
}

export function shuffleArray<T>(data: readonly T[]): T[] {
  return [...data].sort(() => Math.random() - 0.5);
}

export function getRandomUniqueInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export const getNearOffers = (offer: Offer): Offer[] => {
  const nearOffers: Offer[] = [];
  const MAX_NEAR_OFFERS = 3;

  for (let i = 0; i < mockOffers.length; i++) {
    if (mockOffers[i].id !== offer.id && mockOffers[i].city.name === offer.city.name) {
      nearOffers.push(mockOffers[i]);
    }

    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break;
    }
  }

  return nearOffers;
};

