import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Text from '../../../shared/components/text/Text';
import Button from '../../../shared/components/button/Button';
import { AddressItem } from '../../address/screens/AddressList';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { theme } from '../../../shared/themes/theme';
import { styles } from '../styles/checkout.style';
import { useCheckout } from '../hooks/useCheckout';

const CheckoutScreen = () => {
  const {
    addresses,
    addressLoading,
    selectedAddressId,
    setSelectedAddressId,
    handleContinueToPayment,
    handleDeleteSuccess,
    cartItems,
    totalValue,
    handleGoToCreateAddress,
  } = useCheckout();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={styles.title}>Revisão do Pedido</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Endereço de Entrega</Text>
          {addressLoading ? (
            <ActivityIndicator size="large" color={theme.colors.mainTheme.primary} />
          ) : (
            addresses.map((item) => (
              <AddressItem
                key={item.id}
                item={item}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))
          )}
          <View style={{ marginTop: 8 }} />
          <Button
            title="Novo Endereço"
            variant="secondary"
            onPress={handleGoToCreateAddress}
            borderRadius="8px"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo do Pedido</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text>
                {item.amount}x {item.product.name}
              </Text>
              <Text>{convertNumberToMoney(item.product.price * item.amount)}</Text>
            </View>
          ))}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryTotal}>
            <Text>Total:</Text>
            <Text>{convertNumberToMoney(totalValue)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Ir para Pagamento"
          onPress={handleContinueToPayment}
          disabled={!selectedAddressId}
          variant="warning"
          borderRadius="8px"
        />
      </View>
    </View>
  );
};

export default CheckoutScreen;
