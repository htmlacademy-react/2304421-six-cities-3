import { useAppDispatch } from './index';
import { useAppSelector } from './index';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';
import { fetchFavoriteOffersActions, postFavoriteAction } from '../store/api-actions';
import { FavoriteParams } from '../types/favorite';
import { useCallback } from 'react';

export const useFavorite = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const navigate = useNavigate();

  const toggleFavorite = useCallback(({id, isFavorite}: FavoriteParams) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const status = isFavorite ? 0 : 1;

    dispatch(postFavoriteAction({offerId: id, status})).then(() => {
      dispatch(fetchFavoriteOffersActions());
    });
  }, [authorizationStatus, dispatch, navigate]);

  return toggleFavorite;
};
