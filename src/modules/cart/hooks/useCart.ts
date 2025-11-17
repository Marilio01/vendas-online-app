import { useCallback } from 'react';
import { MethodEnum } from '../../../enums/methods.enum';
import { URL_CART } from '../../../shared/constants/urls';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { CartProductType } from '../../../shared/types/cartProductType';
import { CartRequest } from '../../../shared/types/cartRequest';
import { CartType } from '../../../shared/types/cartType';

export const useCart = () => {
  const { request, loading } = useRequests();
  const { cart, setCart, updateItemAmount } = useCartReducer();

  const refreshCart = useCallback(async () => {
    await request<CartType>({
      url: URL_CART,
      method: MethodEnum.GET,
      saveGlobal: setCart,
    });
  }, [request, setCart]);

  const insertProductInCart = useCallback(
    async (productId: number, amount: number = 1) => {
      await request<CartType, CartRequest>({
        url: URL_CART,
        method: MethodEnum.POST,
        body: { amount, productId },
        message: 'Produto adicionado!',
      });

      await refreshCart();
    },
    [request, refreshCart],
  );

  const removeProductFromCart = useCallback(
    async (productId: number) => {
      await request<CartType>({
        url: `${URL_CART}/product/${productId}`,
        method: MethodEnum.DELETE,
        message: 'Produto removido!',
      });

      await refreshCart();
    },
    [request, refreshCart],
  );

  const updateProductAmount = useCallback(
    async (cartItem: CartProductType, newAmount: number) => {
      if (newAmount <= 0) {
        await removeProductFromCart(cartItem.product.id);
        return;
      }

      updateItemAmount(cartItem.id, newAmount);

      await request({
        url: URL_CART,
        method: MethodEnum.PATCH,
        body: { productId: cartItem.product.id, amount: newAmount },
      });

      await refreshCart();
    },
    [request, removeProductFromCart, updateItemAmount, refreshCart],
  );

  return {
    cart,
    loading,
    refreshCart,
    insertProductInCart,
    updateProductAmount,
    removeProductFromCart,
  };
};
