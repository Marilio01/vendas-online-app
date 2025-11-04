import React, { useState } from 'react';
import { ScrollView, View, FlatList, Modal, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../../shared/components/button/Button';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { usePayment } from '../hooks/usePayment';
import * as S from '../styles/payment.style';

const PaymentScreen = () => {
  const {
    selectedPaymentType,
    setSelectedPaymentType,
    amountPayments,
    setAmountPayments,
    handleConfirmOrder,
    orderLoading,
    totalValue,
    showSuccessModal,
    handleContinueShopping,
    handleViewOrders,
  } = usePayment();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const paymentOptions = [
    { id: 'credit_card', title: 'Cartão de Crédito', icon: 'credit-card' },
    { id: 'pix', title: 'PIX', icon: 'hexagon' },
  ];

  const installmentOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((num) => ({
    id: num,
    label: `${num}x de ${convertNumberToMoney(totalValue / num)}`,
  }));

  const selectedInstallmentLabel =
    installmentOptions.find((item) => item.id === amountPayments)?.label ||
    'Selecione o número de parcelas';

  const renderInstallmentItem = ({ item }: { item: (typeof installmentOptions)[0] }) => {
    const isSelected = amountPayments === item.id;
    return (
      <S.InstallmentItem
        isSelected={isSelected}
        onPress={() => {
          setAmountPayments(item.id);
          setIsModalVisible(false);
        }}
        activeOpacity={0.7}
      >
        <S.InstallmentText isSelected={isSelected}>{item.label}</S.InstallmentText>
      </S.InstallmentItem>
    );
  };

  return (
    <S.Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <S.Title>Forma de Pagamento</S.Title>

        <S.Card>
          <S.CardTitle>Escolha sua forma de pagamento</S.CardTitle>
          {paymentOptions.map((item) => {
            const isSelected = selectedPaymentType === item.id;
            return (
              <S.PaymentOption
                key={item.id}
                isSelected={isSelected}
                onPress={() => setSelectedPaymentType(item.id as any)}
                activeOpacity={0.8}
              >
                <S.PaymentLeft>
                  <Feather name={item.icon} size={24} color={isSelected ? '#6C63FF' : '#555'} />
                  <S.PaymentText isSelected={isSelected}>{item.title}</S.PaymentText>
                </S.PaymentLeft>
                {isSelected && <Feather name="check-circle" size={20} color="#6C63FF" />}
              </S.PaymentOption>
            );
          })}
        </S.Card>

        {selectedPaymentType === 'credit_card' && (
          <S.Card>
            <S.CardTitle>Escolha o número de parcelas</S.CardTitle>
            <S.DropdownContainer>
              <S.DropdownTrigger onPress={() => setIsModalVisible(true)} activeOpacity={0.8}>
                <S.DropdownTriggerText>{selectedInstallmentLabel}</S.DropdownTriggerText>
                <Feather name="chevron-down" size={20} color="#555" />
              </S.DropdownTrigger>
            </S.DropdownContainer>
          </S.Card>
        )}

        <S.Card>
          <S.CardTitle>Resumo do Pedido</S.CardTitle>
          <S.SummaryTotal>
            <S.SummaryLabel>Total:</S.SummaryLabel>
            <S.SummaryValue>{convertNumberToMoney(totalValue)}</S.SummaryValue>
          </S.SummaryTotal>
        </S.Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      <S.Footer>
        <Button
          title="Confirmar Pedido"
          onPress={handleConfirmOrder}
          disabled={!selectedPaymentType || orderLoading}
          loading={orderLoading}
          variant="warning"
          borderRadius="8px"
        />
      </S.Footer>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <S.ModalOverlay onPress={() => setIsModalVisible(false)} activeOpacity={1}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <S.ModalContent>
              <S.ModalTitle>Selecione a Parcela</S.ModalTitle>
              <FlatList
                data={installmentOptions}
                renderItem={renderInstallmentItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            </S.ModalContent>
          </Pressable>
        </S.ModalOverlay>
      </Modal>

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={handleContinueShopping}
      >
        <S.ModalOverlay activeOpacity={1}>
          <S.ModalContent>
            <S.ModalTitle>Pedido realizado com sucesso!</S.ModalTitle>
            <S.ModalButtonWrapper>
              <Button
                title="Continuar comprando"
                onPress={handleContinueShopping}
                variant="secondary"
                borderRadius="8px"
              />
              <View style={{ height: 8 }} />
              <Button
                title="Ver pedidos"
                onPress={handleViewOrders}
                variant="warning"
                borderRadius="8px"
              />
            </S.ModalButtonWrapper>
          </S.ModalContent>
        </S.ModalOverlay>
      </Modal>
    </S.Container>
  );
};

export default PaymentScreen;
