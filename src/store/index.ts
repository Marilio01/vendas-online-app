import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import globalReducer from './reducers/globalReducer';
import cartReducer from './reducers/cartReducer';
import categoryReducer from './reducers/categoryReducer';
import addressReducer from './reducers/addressReducer';
import orderReducer from './reducers/orderReducer';

const allReducers = combineReducers({
  userReducer,
  productReducer,
  globalReducer,
  cartReducer,
  categoryReducer,
  addressReducer,
  orderReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_ALL_STATE') {
    return allReducers(undefined, action);
  }

  return allReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
