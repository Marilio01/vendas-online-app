import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartType } from '../../../shared/types/cartType';

interface CartState {
  cart?: CartType;
}

const initialState: CartState = {
  cart: undefined,
};

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    setCartAction: (state, action: PayloadAction<CartType | undefined>) => {
      state.cart = action.payload;
    },

    updateItemAmountAction: (
      state,
      action: PayloadAction<{ cartProductId: number; amount: number }>,
    ) => {
      const { cartProductId, amount } = action.payload;
      if (!state.cart) return;
      const item = state.cart.cartProduct.find((i) => i.id === cartProductId);
      if (item) item.amount = amount;
    },

    clearCartAction: (state) => {
      state.cart = { id: 0, cartProduct: [] };
    },

    removeProductAction: (state, action: PayloadAction<number>) => {
      if (!state.cart) return;
      state.cart.cartProduct = state.cart.cartProduct.filter(
        (item) => item.product.id !== action.payload,
      );
    },
  },
});

export const { setCartAction, updateItemAmountAction, clearCartAction, removeProductAction } =
  cartSlice.actions;

export default cartSlice.reducer;
