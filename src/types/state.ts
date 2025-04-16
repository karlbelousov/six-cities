import { AuthorizationStatus, SubmitStatus } from '../const';
import {store} from '../store/index';
import { City, Offer } from './offer';
import { Review } from './review';
import { SortName } from './types';
import { User } from './user';

export type SiteData = {
  offers: Offer[];
  isOffersLoading: boolean;
  offer: Offer | null;
  isOfferLoading: boolean;
  nearbyOffers: Offer[];
  comments: Review[];
  commentStatus: SubmitStatus;
  favoriteOffers: Offer[];
  isFavoriteOffersLoading: boolean;
};

export type SiteProcess = {
  city: City;
  sorting: SortName;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
