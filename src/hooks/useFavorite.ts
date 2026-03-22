import { useAppDispatch } from './index';
import { useAppSelector } from './index';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';
import { toggleFavoriteAction } from '../store/api-actions';
import { FavoriteParams } from '../types/favorite';

export const useFavorite = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const navigate = useNavigate();

  const toggleFavorite = ({id, isFavorite}: FavoriteParams) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const status = isFavorite ? 0 : 1;

    dispatch(toggleFavoriteAction({offerId: id, status}));
  };

  return toggleFavorite;
};
