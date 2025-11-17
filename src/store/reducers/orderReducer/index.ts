import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../../shared/types/OrderType';

interface OrderState {
  orders: OrderType[];
}

const initialState: OrderState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    setOrdersAction: (state, action: PayloadAction<OrderType[]>) => {
      state.orders = action.payload;
    },
    clearOrdersAction: (state) => {
      state.orders = initialState.orders;
    },
  },
});

export const { setOrdersAction, clearOrdersAction } = orderSlice.actions;

export default orderSlice.reducer;
