
import React, { useMemo, useState } from 'react';
import { View, FlatList, ActivityIndicator, Image, Modal, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import { useCart } from '../hooks/useCart';
import Text from '../../../shared/components/text/Text';
import Button from '../../../shared/components/button/Button';
import CartQuantityManager from './CartQuantityManager';
import { theme } from '../../../shared/themes/theme';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { CartProductType } from '../../../shared/types/cartProductType';
import { textTypes } from '../../../shared/components/text/textTypes';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';
import { Icon } from '../../../shared/components/icon/Icon';
import styles from '../styles/cart.style';


const Cart = () => {
    const { navigate } = useNavigation<NavigationProp<ParamListBase>>();
    const { cart, loading, updateProductAmount, removeProductFromCart } = useCart();

    const [itemToDelete, setItemToDelete] = useState<CartProductType | null>(null);

    const cartItems = useMemo(() => cart?.cartProduct || [], [cart]);

    const totalValue = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.product.price * item.amount), 0);
    }, [cartItems]);

    const handleGoToCheckout = () => {
        navigate(MenuUrl.HOME);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            removeProductFromCart(itemToDelete.product.id);
            setItemToDelete(null);
        }
    };


    const renderCartItem = ({ item }: { item: CartProductType }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.product.image }} style={styles.productImage} />


            <View style={styles.detailsContainer}>

                <View style={styles.infoContainer}>
                    <Text numberOfLines={2} style={styles.productName}>{item.product.name}</Text>
                    <Text color={theme.colors.mainTheme.primary} type={textTypes.PARAGRAPH_SEMI_BOLD}>
                        {convertNumberToMoney(item.product.price)}
                    </Text>
                </View>


                <View style={styles.quantityContainer}>
                    <CartQuantityManager
                        amount={item.amount}
                        onIncrease={() => updateProductAmount(item, item.amount + 1)}
                        onDecrease={() => updateProductAmount(item, item.amount - 1)}
                    />
                </View>


                <TouchableOpacity style={styles.deleteButton} onPress={() => setItemToDelete(item)}>
                    <Icon name="bin2" size={24} color={theme.colors.orangeTheme.orange80} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderEmptyCart = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={!!itemToDelete}
                onRequestClose={() => setItemToDelete(null)}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Remover Item</Text>
                        <Text style={styles.modalText}>Tem certeza que deseja remover este item do carrinho?</Text>
                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={() => setItemToDelete(null)} type={theme.buttons.buttonsTheme.secondary} margin="0px 8px 0px 0px" />
                        </View>
                        <Button title="Sim, remover" onPress={handleConfirmDelete} margin="10px 0px 0px 0px" />/
                    </View>
                </View>
            </Modal>

            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={renderEmptyCart}
                contentContainerStyle={styles.listContent}
            />

            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total:</Text>
                        <Text style={styles.totalValue}>{convertNumberToMoney(totalValue)}</Text>
                    </View>
                    <Button
                        title="Finalizar Compra"
                        onPress={handleGoToCheckout}
                        type={theme.buttons.buttonsTheme.primary}
                    />
                </View>
            )}
        </View>
    );
};



export default Cart;