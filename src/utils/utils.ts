import { City } from '../types/city';
import { OfferDetails } from '../types/offer-details';
import { Offer } from '../types/offer';

export function getRandomCity(cities: City[]): City {
  const randomInt = Math.floor(Math.random() * cities.length);
  return cities[randomInt];
}

export const mockOfferDetails: OfferDetails = {
  id: '0212',
  title: 'Some title',
  type: 'Some type',
  price: 100,
  city: {
    name: 'London',
    location: {
      latitude: 2343434,
      longitude: 34343433,
      zoom: 6,
    },
  },
  location: {
    latitude: 33423,
    longitude: 434388,
    zoom: 7,
  },
  isFavorite: false,
  isPremium: false,
  rating: 5,
  description: 'Some description',
  bedrooms: 3,
  goods: ['Some good_1'],
  host: {
    name: 'Some name',
    avatarUrl: 'url/32343',
    isPro: false,
  },
  images: ['url/3343'],
  maxAdults: 3,
};

export const mockOffer: Offer = {
  id: '34324',
  title: 'Some title',
  offerType: 'hotel',
  rating: 5,
  price: 1000,
  isPremium: false,
  isFavorite: false,
  previewImage: 'url/43234',
  city: {
    name: 'Some city name',
    location: {
      latitude: 34323,
      longitude: 3234324,
      zoom: 6,
    },
  },
  location: {
    latitude: 432433,
    longitude: 342434,
    zoom: 342342,
  },
};

export const mockUser = {
  name: 'Some_name',
  avatarUrl: 'url/3423',
  isPro: false,
  email: 'some_email',
  token: '324234',
};

export const mockAuthData = {
  login: 'Some_login',
  password: '324kjl',
};
