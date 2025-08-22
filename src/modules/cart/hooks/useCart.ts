// Em: src/modules/cart/hooks/useCart.ts
import { useCallback } from 'react';
import { MethodEnum } from '../../../enums/methods.enum';
import { URL_CART } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { CartProductType } from '../../../shared/types/cartProductType';
import { CartRequest } from '../../../shared/types/cartRequest';

export const useCart = () => {
  const { request, loading } = useRequest();
  const { cart, setCart, updateItemAmount } = useCartReducer();

  // Função para buscar o carrinho da API
  const refreshCart = useCallback(async () => {
    await request({ url: URL_CART, method: MethodEnum.GET, saveGlobal: setCart });
  }, [request, setCart]);

  // Função para remover um produto
  const removeProductFromCart = useCallback(async (productId: number) => {
    await request({
      url: `${URL_CART}/product/${productId}`, // URL correta para deletar
      method: MethodEnum.DELETE,
      message: 'Produto removido!',
    });
    await refreshCart();
  }, [request, refreshCart]);

  // Função para atualizar a quantidade
  const updateProductAmount = useCallback(async (cartItem: CartProductType, newAmount: number) => {
    // Se a quantidade for zero ou menos, remove o produto
    if (newAmount <= 0) {
      await removeProductFromCart(cartItem.product.id);
      return;
    }

    // Atualiza a quantidade no estado local instantaneamente
    updateItemAmount(cartItem.id, newAmount); 

    // Envia a requisição para a API em segundo plano
    await request({
      url: URL_CART,
      method: MethodEnum.PATCH,
      body: { productId: cartItem.product.id, amount: newAmount },
    });
  }, [request, removeProductFromCart, updateItemAmount]);

  // Função para adicionar um novo produto
  const insertProductInCart = useCallback(async (productId: number) => {
    await request<unknown, CartRequest>({
      url: URL_CART,
      method: MethodEnum.POST,
      body: { amount: 1, productId },
      message: 'Produto adicionado!',
    });
    await refreshCart();
  }, [request, refreshCart]);

  return {
    cart,
    loading,
    insertProductInCart,
    updateProductAmount,
    removeProductFromCart,
  };
};