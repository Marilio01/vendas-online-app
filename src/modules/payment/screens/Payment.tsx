import React, { useState } from 'react';
import { ScrollView, View, FlatList, Modal, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../../shared/components/button/Button';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { usePayment } from '../hooks/usePayment';
import * as S from '../styles/payment.style';
import { theme } from '../../../shared/themes/theme';
import QRCode from 'react-native-qrcode-svg';

const PaymentScreen = () => {
  const {
    selectedPaymentType,
    amountPayments,
    setAmountPayments,
    handleConfirmOrder,
    orderLoading,
    totalValue,
    showSuccessModal,
    handleContinueShopping,
    handleViewOrders,
    codePix,
  } = usePayment();

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const renderPaymentDetails = () => {
    if (selectedPaymentType === 'pix') {
      return (
        <S.Card>
          <S.CardTitle>Pague com PIX</S.CardTitle>
          <S.QRCodeContainer>
            <QRCode
              value={codePix}
              size={200}
              backgroundColor={theme.colors.neutral.surface}
              color={theme.colors.text.primary}
            />
            <S.QRCodeLabel>Escaneie o QR Code para pagar</S.QRCodeLabel>
          </S.QRCodeContainer>
        </S.Card>
      );
    }

    if (selectedPaymentType === 'credit_card') {
      return (
        <S.Card>
          <S.CardTitle>Escolha o número de parcelas</S.CardTitle>
          <S.DropdownContainer>
            <S.DropdownTrigger onPress={() => setIsModalVisible(true)} activeOpacity={0.8}>
              <S.DropdownTriggerText>{selectedInstallmentLabel}</S.DropdownTriggerText>
              <Feather name="chevron-down" size={20} color={theme.colors.text.secondary} />
            </S.DropdownTrigger>
          </S.DropdownContainer>
        </S.Card>
      );
    }

    return null;
  };

  return (
    <S.Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {renderPaymentDetails()}

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
          title={selectedPaymentType === 'pix' ? 'Pagamento Realizado' : 'Confirmar Pagamento'}
          onPress={handleConfirmOrder}
          disabled={!selectedPaymentType || orderLoading}
          loading={orderLoading}
          variant="primary"
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
                variant="primary"
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
