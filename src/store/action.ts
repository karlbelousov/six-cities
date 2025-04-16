import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserAuth } from '../types/user';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AppDispatch } from '../types/state';
import { Review, ReviewAuth } from '../types/review';
import { FavoriteAuth, Offer } from '../types/offer';

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  POST_FAVORITE: 'offer/post-favorite',
  FETCH_USER_STATUS: 'user/fetch-status',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  REDIRECT_TO_ROUTE: 'user/redirectToRoute',
  FETCH_NEARBY_OFFERS: 'offers/fetch-nearby',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
};

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  Action.FETCH_OFFERS,
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);

    return data;
  });

export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: AxiosInstance }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra: api }) => {
    const { data } = await api.get<User>(ApiRoute.Login);

    return data;
  });

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { dispatch: AppDispatch; extra: AxiosInstance}>(
  Action.LOGIN_USER,
  async ({ email, password }, {dispatch, extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.Login, { email, password });
    const { token } = data;
    saveToken(token);

    dispatch(redirectToRoute(AppRoute.Main));

    return email;
  });

export const logoutUser = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  Action.LOGOUT_USER,
  async (_arg, {extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  });

export const fetchOffer = createAsyncThunk<Offer, Offer['id'], { extra: AxiosInstance; dispatch: AppDispatch }>(
  Action.FETCH_OFFER,
  async (id, { extra: api, dispatch }) => {
    try {
      const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }

      return Promise.reject(error);
    }
  });

export const fetchNearbyOffers = createAsyncThunk<Offer[], Offer['id'], { extra: AxiosInstance }>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);

    return data;
  });

export const fetchComments = createAsyncThunk<Review[], Offer['id'], { extra: AxiosInstance}>(
  Action.FETCH_COMMENTS,
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);

    return data;
  });

export const postComment = createAsyncThunk<Review[], ReviewAuth, { extra: AxiosInstance }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review[]>(`${ApiRoute.Comments}/${id}`, { comment, rating });

    return data;
  });

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Favorite);

    return data;
  });

export const postFavorite = createAsyncThunk<Offer, FavoriteAuth, { extra: AxiosInstance; dispatch: AppDispatch }>(
  Action.POST_FAVORITE,
  async ({ id, status }, { extra: api, dispatch }) => {
    try {
      const { data } = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/${status}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NoAuth) {
        dispatch(redirectToRoute(AppRoute.Login));
      }

      return Promise.reject(error);
    }
  });
