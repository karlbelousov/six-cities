import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '../action';
import history from '../../history';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === Action.REDIRECT_TO_ROUTE) {
          history.push(action.payload);
        }

        return next(action);
      };
