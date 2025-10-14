import React, { useState, useMemo, useCallback } from 'react';
import { View, ScrollView, Alert, ActivityIndicator } from 'react-native'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Text from '../../../shared/components/text/Text';
import Button from '../../../shared/components/button/Button';
import { useCart } from '../../cart/hooks/useCart';
import { useAddress } from '../../address/hooks/useAddress';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { styles } from './checkout.style';
import { AddressItem } from '../../address/screens/AddressList';
import { theme } from '../../../shared/themes/theme';
import { displayLocalNotification } from '../../../shared/services/notificationsSevices';


const CheckoutScreen = () => {
    const navigation = useNavigation();
    const { cart } = useCart();
    const { addresses, fetchAddresses, addressLoading } = useAddress();
    const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();

    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );

    const cartItems = useMemo(() => cart?.cartProduct || [], [cart]);
    const totalValue = useMemo(() => cartItems.reduce((acc, item) => acc + (item.product.price * item.amount), 0), [cartItems]);

    const handleConfirmOrder = () => {
        if (!selectedAddressId) {
            Alert.alert('Atenção', 'Por favor, selecione um endereço de entrega.');
            return;
        }

        Alert.alert('Sucesso', 'Pedido realizado com sucesso!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);

        displayLocalNotification(
            'Pedido Confirmado! ✅',
            `Seu pedido no valor de ${convertNumberToMoney(totalValue)} foi recebido e já está sendo preparado.`
        );
    };

    const handleDeleteSuccess = () => {
        setSelectedAddressId(undefined);
        fetchAddresses();
    }

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
                        onPress={() => (navigation.navigate as any)('CreateAddress')}
                        borderRadius="8px"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Resumo do Pedido</Text>
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.summaryItem}>
                            <Text>{item.amount}x {item.product.name}</Text>
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
                    title="Confirmar Pedido"
                    onPress={handleConfirmOrder}
                    disabled={!selectedAddressId}
                    variant="warning"
                    borderRadius="8px"
                />
            </View>
        </View>
    );
};

export default CheckoutScreen;