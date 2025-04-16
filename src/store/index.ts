import { configureStore} from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { fetchFavoriteOffers, fetchOffers, fetchUserStatus } from './action';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect),
});

store.dispatch(fetchUserStatus());
store.dispatch(fetchOffers());
store.dispatch(fetchFavoriteOffers());


