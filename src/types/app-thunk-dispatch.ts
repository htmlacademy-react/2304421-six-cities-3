import { createAPI } from '../services/api';
import { RootState } from '../types/state';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';


export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;
