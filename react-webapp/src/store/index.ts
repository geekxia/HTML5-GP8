import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import counter from './slices/counter';

export const store = configureStore({
  reducer: {
    counter,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
