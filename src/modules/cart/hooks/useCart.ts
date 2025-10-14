

import { useCallback } from 'react';
import { MethodEnum } from '../../../enums/methods.enum';
import { URL_CART } from '../../../shared/constants/urls';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { CartProductType } from '../../../shared/types/cartProductType';
import { CartRequest } from '../../../shared/types/cartRequest';
import { displayLocalNotification } from '../../../shared/services/notificationsSevices';


export const useCart = () => {
  const { request, loading } = useRequests();
  
  
  const { cart, setCart, updateItemAmount } = useCartReducer();

  
  const refreshCart = useCallback(async () => {
    await request({ url: URL_CART, method: MethodEnum.GET, saveGlobal: setCart });
  }, [request, setCart]);

  
  const removeProductFromCart = useCallback(async (productId: number) => {
    await request({
      url: `${URL_CART}/product/${productId}`,
      method: MethodEnum.DELETE,
      message: 'Produto removido!',
    });
    await refreshCart();
    await displayLocalNotification(
      'Produto Removido',
      'O item foi removido do seu carrinho.'
    );
  }, [request, refreshCart]);

  
  const updateProductAmount = useCallback(async (cartItem: CartProductType, newAmount: number) => {
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
  }, [request, removeProductFromCart, updateItemAmount]);

  
  const insertProductInCart = useCallback(async (productId: number) => {
    await request<unknown, CartRequest>({
      url: URL_CART,
      method: MethodEnum.POST,
      body: { amount: 1, productId },
      message: 'Produto adicionado!',
    });
    await refreshCart();
    await displayLocalNotification(
      'Produto Adicionado!',
      'Seu item foi adicionado ao carrinho com sucesso.'
    );
  }, [request, refreshCart]);

  return {
    cart,
    loading,
    insertProductInCart,
    updateProductAmount,
    removeProductFromCart,
  };
};