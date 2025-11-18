import React, { useState, useLayoutEffect } from 'react';
import { View, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../shared/components/button/Button';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { theme } from '../../../shared/themes/theme';
import { useCheckout } from '../hooks/useCheckout';
import * as S from '../styles/checkout.style';
import { CartProductType } from '../../../shared/types/cartProductType';
import Icon from 'react-native-vector-icons/Feather';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const {
    isInitializing,
    selectedAddress,
    selectedPaymentMethod,
    paymentMethodName,
    cartItems,
    totalValue,
    handleFinalizeOrder,
    handleGoToAddressList,
    handleGoToPaymentList,
    updateProductAmount,
    removeProductFromCart,
  } = useCheckout();

  const [itemToDelete, setItemToDelete] = useState<CartProductType | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate(MenuUrl.HOME, { screen: MenuUrl.CART })}
          style={{ marginRight: 16 }}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeProductFromCart(itemToDelete.product.id);
      setItemToDelete(null);
    }
  };

  if (isInitializing) {
    return (
      <S.FullScreenLoader>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </S.FullScreenLoader>
    );
  }

  return (
    <S.Container>
      <Modal
        transparent
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

      <S.ScrollView>
        <S.SummaryCard>
          <S.SummaryRow>
            <S.SummaryLabel>Total</S.SummaryLabel>
            <S.SummaryValue>{convertNumberToMoney(totalValue)}</S.SummaryValue>
          </S.SummaryRow>
        </S.SummaryCard>

        <S.SectionButton onPress={handleGoToPaymentList}>
          <S.SectionButtonTitle>Forma de Pagamento</S.SectionButtonTitle>
          <S.SectionButtonContent>
            <S.SectionButtonTextWrapper>
              {selectedPaymentMethod ? (
                <S.SectionButtonText>{paymentMethodName}</S.SectionButtonText>
              ) : (
                <S.AddressPromptText>Nenhuma forma de pagamento selecionada.</S.AddressPromptText>
              )}
            </S.SectionButtonTextWrapper>
            <S.SectionButtonLink>
              {selectedPaymentMethod ? 'Alterar' : 'Selecionar'}
            </S.SectionButtonLink>
          </S.SectionButtonContent>
        </S.SectionButton>

        <S.SectionButton onPress={handleGoToAddressList}>
          <S.SectionButtonTitle>Endereço de Entrega</S.SectionButtonTitle>
          <S.SectionButtonContent>
            <S.SectionButtonTextWrapper>
              {selectedAddress ? (
                <>
                  <S.SectionButtonText>
                    {`${selectedAddress.street}, ${selectedAddress.numberAddress}`}
                  </S.SectionButtonText>
                  <S.SectionButtonText>
                    {`${selectedAddress.neighborhood} - ${selectedAddress.city?.name}/${selectedAddress.city?.state?.uf}`}
                  </S.SectionButtonText>
                </>
              ) : (
                <S.AddressPromptText>Nenhum endereço selecionado.</S.AddressPromptText>
              )}
            </S.SectionButtonTextWrapper>
            <S.SectionButtonLink>{selectedAddress ? 'Alterar' : 'Selecionar'}</S.SectionButtonLink>
          </S.SectionButtonContent>
        </S.SectionButton>

        <S.Card>
          <S.CardTitle>Produtos</S.CardTitle>
          {cartItems.map((item, index) => (
            <S.ProductItemContainer
              key={item.id}
              style={{ borderBottomWidth: index === cartItems.length - 1 ? 0 : 1 }}
            >
              <S.ProductImage source={{ uri: item.product.image }} />
              <S.ProductDetails>
                <S.ProductInfoRow>
                  <S.ProductName numberOfLines={1}>{item.product.name}</S.ProductName>
                  <S.ProductPriceInline>
                    {convertNumberToMoney(item.product.price)}
                  </S.ProductPriceInline>
                </S.ProductInfoRow>

                <S.ProductActionRow>
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
                    <S.CartQuantityButton
                      onPress={() => updateProductAmount(item, item.amount + 1)}
                    >
                      <Icon name="plus" size={16} color={theme.colors.primary.main} />
                    </S.CartQuantityButton>
                  </S.CartQuantityWrapper>
                  <S.DeleteButton onPress={() => setItemToDelete(item)}>
                    <Icon name="trash-2" size={20} color={theme.colors.semantic.error} />
                  </S.DeleteButton>
                </S.ProductActionRow>
              </S.ProductDetails>
            </S.ProductItemContainer>
          ))}
        </S.Card>
      </S.ScrollView>

      <S.Footer>
        <Button
          title="Finalizar Pedido"
          onPress={handleFinalizeOrder}
          disabled={!selectedAddress || !selectedPaymentMethod || cartItems.length === 0}
          variant="primary"
          borderRadius="8px"
        />
      </S.Footer>
    </S.Container>
  );
};

export default CheckoutScreen;
