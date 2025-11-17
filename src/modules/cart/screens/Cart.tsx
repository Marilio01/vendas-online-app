import React, { useMemo, useState } from 'react';
import { View, FlatList, Modal } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useCart } from '../hooks/useCart';
import Button from '../../../shared/components/button/Button';
import { theme } from '../../../shared/themes/theme';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { CartProductType } from '../../../shared/types/cartProductType';
import Icon from 'react-native-vector-icons/Feather';
import * as S from '../styles/cart.style';

const Cart = () => {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>();
  const { cart, updateProductAmount, removeProductFromCart } = useCart();

  const [itemToDelete, setItemToDelete] = useState<CartProductType | null>(null);

  const cartItems = useMemo(() => {
    const items = cart?.cartProduct || [];
    return items.slice().sort((a, b) => b.id - a.id);
  }, [cart]);

  const totalValue = useMemo(() => {
    return (cart?.cartProduct || []).reduce(
      (acc, item) => acc + item.product.price * item.amount,
      0,
    );
  }, [cart]);

  const handleGoToCheckout = () => {
    navigate('Checkout');
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeProductFromCart(itemToDelete.product.id);
      setItemToDelete(null);
    }
  };

  const renderCartItem = ({ item }: { item: CartProductType }) => (
    <S.ItemContainer>
      <S.ProductImage source={{ uri: item.product.image }} />

      <S.DetailsContainer>
        <S.ProductTopRow>
          <S.ProductName numberOfLines={2}>{item.product.name}</S.ProductName>
          <S.DeleteButton onPress={() => setItemToDelete(item)}>
            <Icon name="trash-2" size={20} color={theme.colors.semantic.error} />
          </S.DeleteButton>
        </S.ProductTopRow>

        <S.QuantityAndDeleteRow>
          <S.ProductPrice>{convertNumberToMoney(item.product.price)}</S.ProductPrice>

          <S.CartQuantityWrapper>
            <S.CartQuantityButton
              onPress={() => {
                if (item.amount === 1) {
                  setItemToDelete(item);
                } else {
                  updateProductAmount(item, item.amount - 1);
                }
              }}
            >
              <Icon name="minus" size={16} color={theme.colors.primary.main} />
            </S.CartQuantityButton>

            <S.CartQuantityAmount>{item.amount}</S.CartQuantityAmount>

            <S.CartQuantityButton onPress={() => updateProductAmount(item, item.amount + 1)}>
              <Icon name="plus" size={16} color={theme.colors.primary.main} />
            </S.CartQuantityButton>
          </S.CartQuantityWrapper>
        </S.QuantityAndDeleteRow>
      </S.DetailsContainer>
    </S.ItemContainer>
  );

  const renderEmptyCart = () => (
    <S.EmptyContainer>
      <Icon name="shopping-cart" size={48} color={theme.colors.neutral.disabled} />
      <S.EmptyText>Seu carrinho está vazio.</S.EmptyText>
    </S.EmptyContainer>
  );

  return (
    <S.Container>
      <Modal
        transparent={true}
        visible={!!itemToDelete}
        onRequestClose={() => setItemToDelete(null)}
        animationType="fade"
      >
        <S.ModalOverlay>
          <S.ModalContainer>
            <S.ModalTitle>Remover Item</S.ModalTitle>
            <S.ModalText>Tem certeza que deseja remover este item do carrinho?</S.ModalText>
            <Button title="Cancelar" onPress={() => setItemToDelete(null)} variant="secondary" />
            <View style={{ height: 8 }} />
            <Button title="Sim, remover" onPress={handleConfirmDelete} variant="danger" />
          </S.ModalContainer>
        </S.ModalOverlay>
      </Modal>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyCart}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {cartItems.length > 0 && (
        <S.Footer>
          <S.TotalContainer>
            <S.TotalText>Total:</S.TotalText>
            <S.TotalValue>{convertNumberToMoney(totalValue)}</S.TotalValue>
          </S.TotalContainer>
          <Button
            title="Ir para Checkout"
            onPress={handleGoToCheckout}
            variant="primary"
            borderRadius="8px"
          />
        </S.Footer>
      )}
    </S.Container>
  );
};

export default Cart;
