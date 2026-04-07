import { CITIES } from '../../const';
import { cityReducer, setCity } from './city-slice';

describe('CitySlice', () => {
  it('should return current state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      city: CITIES[1],
    };

    const result = cityReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      city: CITIES[0],
    };

    const result = cityReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set city', () => {
    const initialState = {
      city: CITIES[0],
    };
    const expectedCity = CITIES[1];

    const result = cityReducer(initialState, setCity(expectedCity));

    expect(result.city).toEqual(expectedCity);
  });
});
