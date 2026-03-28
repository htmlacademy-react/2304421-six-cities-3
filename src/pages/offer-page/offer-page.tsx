import { Helmet } from 'react-helmet-async';
import OfferImage from './offer-image';
import OfferInsideItem from './offer-inside-item';
import { useParams, Navigate } from 'react-router-dom';
import OfferReviewForm from './offer-review-form';
import ReviewsList from './reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { MapOffer } from '../../types/map-offers';
import { fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import Spinner from '../../components/spinner/spinner';
import { VISIBLE_NEARBY_OFFERS_COUNT } from '../../const';
import { AuthorizationStatus } from '../../const';
import { useFavorite } from '../../hooks/useFavorite';

function OfferPage(): JSX.Element | null {
  const currentOffer = useAppSelector((state) => state.currentOffer.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers.nearbyOffers).slice(0, VISIBLE_NEARBY_OFFERS_COUNT);
  const comments = useAppSelector((state) => state.comments.comments);
  const isOfferLoading = useAppSelector((state) => state.currentOffer.isCurrentOfferLoading);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const dispatch = useAppDispatch();
  const isOfferNotFound = useAppSelector((state) => state.currentOffer.isCurrentOfferNotFound);
  const toggleFavorite = useFavorite();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [id, dispatch]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (isOfferNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (!currentOffer) {
    return null;
  }

  const nearOffersPlusOffer: MapOffer[] = [
    ...nearbyOffers.map((offer) => ({
      id: offer.id,
      location: offer.location,
    })),
    {
      id: currentOffer.id,
      location: currentOffer.location,
    },
  ];

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>Offer page</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.map((image) => (
              <OfferImage key={image} img={image} />
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {currentOffer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{currentOffer.title}</h1>
              <button
                className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                type="button"
                onClick={() => toggleFavorite({id: currentOffer.id, isFavorite: currentOffer.isFavorite})}
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span
                  style={{ width: `${currentOffer.rating * 20}%` }}
                />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">
                {currentOffer.rating}
              </span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {currentOffer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {`${currentOffer.bedrooms} ${currentOffer.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`}
              </li>
              <li className="offer__feature offer__feature--adults">
                {`Max ${currentOffer.maxAdults} ${currentOffer.maxAdults === 1 ? 'adult' : 'adults'}`}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods.map((good) => (
                  <OfferInsideItem key={good} option={good} />
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={currentOffer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {currentOffer.host.name}
                </span>
                {currentOffer.host.isPro && (
                  <span className="offer__user-status">Pro</span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">{currentOffer.description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <ReviewsList comments={comments} />
              {authorizationStatus === AuthorizationStatus.Auth && (
                <OfferReviewForm />
              )}
            </section>
          </div>
        </div>
        <Map
          city={currentOffer.city}
          offers={nearOffersPlusOffer}
          className="offer__map map"
          activeOfferId={currentOffer.id}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            <OffersList offers={nearbyOffers} onFavoriteToggleClick={toggleFavorite}/>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
