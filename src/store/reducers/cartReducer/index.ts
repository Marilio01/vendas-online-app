
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
       
        updateItemAmountAction: (state, action: PayloadAction<{ cartProductId: number; amount: number }>) => {
            const { cartProductId, amount } = action.payload;
            if (state.cart && state.cart.cartProduct) {
                const itemIndex = state.cart.cartProduct.findIndex(item => item.id === cartProductId);
                if (itemIndex !== -1) {
                    state.cart.cartProduct[itemIndex].amount = amount;
                }
            }
        },
    },
});

export const { setCartAction, updateItemAmountAction } = cartSlice.actions;

export default cartSlice.reducer;