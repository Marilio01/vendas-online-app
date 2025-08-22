
import { useDispatch } from 'react-redux';
import { CartType } from '../../../shared/types/cartType';
import { useAppSelector } from '../../hooks';
import { setCartAction, updateItemAmountAction } from '.';

export const useCartReducer = () => {
    const dispatch = useDispatch();
    const { cart } = useAppSelector((state) => state.cartReducer);

    const setCart = (currentCart?: CartType) => {
        dispatch(setCartAction(currentCart));
    };


    const updateItemAmount = (cartProductId: number, amount: number) => {
        dispatch(updateItemAmountAction({ cartProductId, amount }));
    };

    return {
        cart,
        setCart,
        updateItemAmount,
    };
};