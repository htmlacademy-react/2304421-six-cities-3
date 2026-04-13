import { City } from '../types/city';

export function getRandomCity(cities: City[]): City {
  const randomInt = Math.floor(Math.random() * cities.length);
  return cities[randomInt];
}
