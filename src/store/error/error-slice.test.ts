import { errorReducer, setError } from './error-slice';

describe('Error Slice', () => {
  it('should set "error" with setError', () => {
    const initialState = {
      error: null,
    };

    const result = errorReducer(initialState, setError('Error'));

    expect(result.error).toBe('Error');
  });

  it('should return initial state with empty action', () => {
    const initialState = {
      error: null,
    };

    const result = errorReducer(initialState, {type: ''});

    expect(result.error).toBe(null);
  });

  it('should clear error', () => {
    const initialState = {
      error: 'Some error',
    };

    const result = errorReducer(initialState, setError(null));

    expect(result.error).toBeNull();
  });
});
