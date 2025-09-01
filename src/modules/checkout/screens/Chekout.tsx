// Em: src/modules/checkout/screens/CheckoutScreen.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Modal, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import Text from '../../../shared/components/text/Text';
import Button from '../../../shared/components/button/Button';
import { useAddress } from '../../address/hooks/useAddress';
import { useCart } from '../../cart/hooks/useCart';
import { theme } from '../../../shared/themes/theme';
import { AddressType } from '../../../shared/types/AddressType';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { textTypes } from '../../../shared/components/text/textTypes';
import { Icon } from '../../../shared/components/icon/Icon';
import { styles } from './checkout.style'; // Importaremos os estilos do próximo passo

const CheckoutScreen = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { addresses, fetchAddresses, deleteAddress, addressLoading } = useAddress();
    const { cart } = useCart();

    const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();
    const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id?: number }>({ visible: false });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const cartItems = useMemo(() => cart?.cartProduct || [], [cart]);
    const totalValue = useMemo(() => cartItems.reduce((acc, item) => acc + (item.product.price * item.amount), 0), [cartItems]);

    const confirmDelete = async () => {
        if (deleteModal.id) {
            await deleteAddress(deleteModal.id);
            setDeleteModal({ visible: false });
            if (selectedAddressId === deleteModal.id) {
                setSelectedAddressId(undefined);
            }
        }
    };

    const handleConfirmOrder = () => {
        if (!selectedAddressId) {
            Alert.alert('Atenção', 'Por favor, selecione um endereço de entrega.');
            return;
        }
        Alert.alert('Sucesso', 'Pedido realizado com sucesso!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    const renderAddressItem = ({ item }: { item: AddressType }) => (
        <TouchableOpacity
            style={[styles.addressItem, selectedAddressId === item.id && styles.selectedAddressItem]}
            onPress={() => setSelectedAddressId(item.id)}
        >
            <Icon name={selectedAddressId === item.id ? "radio-checked" : "radio-unchecked"} size={20} color={theme.colors.mainTheme.primary} />
            <View style={styles.addressContent}>
                <Text type={textTypes.PARAGRAPH_SEMI_BOLD}>{`${item.street}, ${item.numberAddress}`}</Text>
                <Text>{`${item.neighborhood} - ${item.city?.name}/${item.city?.state?.uf}`}</Text>
            </View>
            <TouchableOpacity onPress={() => setDeleteModal({ visible: true, id: item.id })}>
                <Icon name="bin2" size={20} color={theme.colors.grayTheme.gray80} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Modal transparent={true} visible={deleteModal.visible} onRequestClose={() => setDeleteModal({ visible: false })}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Tem certeza?</Text>
                        <Text style={styles.modalText}>Deseja remover este endereço?</Text>
                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={() => setDeleteModal({ visible: false })} type={theme.buttons.buttonsTheme.secondary} margin="0px 8px 0px 0px"/>

                        </View>
                         <Button title="Sim, remover" onPress={confirmDelete} margin="10px 8px 0px 0px" />
                    </View>
                </View>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Revisão do Pedido</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Endereço de Entrega</Text>
                    {addressLoading ? <ActivityIndicator color={theme.colors.mainTheme.primary} /> : (
                        <FlatList data={addresses} renderItem={renderAddressItem} keyExtractor={(item) => item.id.toString()} />
                    )}
                    <Button title="Novo Endereço" margin="16px 0px 0px 0px" type={theme.buttons.buttonsTheme.secondary}/>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Resumo do Pedido</Text>
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.summaryItem}>
                            <Text style={styles.summaryItemName}>{item.amount}x {item.product.name}</Text>
                            <Text style={styles.summaryItemPrice}>{convertNumberToMoney(item.product.price * item.amount)}</Text>
                        </View>
                    ))}
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryTotal}>
                        <Text type={textTypes.TITLE_BOLD}>Total:</Text>
                        <Text type={textTypes.TITLE_BOLD} color={theme.colors.mainTheme.primary}>{convertNumberToMoney(totalValue)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Confirmar Pedido"
                    onPress={handleConfirmOrder}
                    type={theme.buttons.buttonsTheme.primary}
                    disabled={!selectedAddressId || addressLoading}
                />
            </View>
        </View>
    );
};

export default CheckoutScreen;