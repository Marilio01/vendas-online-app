import React, { useState } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';

import { useAddress } from '../hooks/useAddress';
import { AddressType } from '../../../shared/types/AddressType';
import Text from '../../../shared/components/text/Text';
import Button from '../../../shared/components/button/Button';
import { Icon } from '../../../shared/components/icon/Icon';
import { theme } from '../../../shared/themes/theme';
import { styles } from '../../checkout/screens/checkout.style';

interface AddressItemProps {
  item: AddressType;
  selectedAddressId?: number;
  onSelectAddress: (addressId: number) => void;
  onDeleteSuccess: () => void;
}

export const AddressItem = ({ item, selectedAddressId, onSelectAddress, onDeleteSuccess }: AddressItemProps) => {
    const { deleteAddress } = useAddress();
    const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id?: number }>({ visible: false });

    const confirmDelete = async () => {
        if (deleteModal.id) {
            await deleteAddress(deleteModal.id);
            onDeleteSuccess();
            setDeleteModal({ visible: false });
        }
    };
    
    return (
        <>
            <Modal transparent={true} visible={deleteModal.visible} onRequestClose={() => setDeleteModal({ visible: false })}>
                 <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Tem certeza?</Text>
                        <Text style={styles.modalText}>Deseja remover este endereço?</Text>
                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={() => setDeleteModal({ visible: false })} type="secondary" margin="0px 8px 0px 0px"/>
                            <Button title="Sim, remover" onPress={confirmDelete} />
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={[styles.addressItem, selectedAddressId === item.id && styles.selectedAddressItem]}
                onPress={() => onSelectAddress(item.id)}
            >
                <Icon name={selectedAddressId === item.id ? "radio-checked" : "radio-unchecked"} size={20} color={theme.colors.mainTheme.primary} />
                <View style={styles.addressContent}>
                    <Text>{`${item.street}, ${item.numberAddress}`}</Text>
                    <Text>{`${item.neighborhood} - ${item.city?.name}/${item.city?.state?.uf}`}</Text>
                </View>
                <TouchableOpacity onPress={() => setDeleteModal({ visible: true, id: item.id })}>
                    <Icon name="bin2" size={20} color={theme.colors.grayTheme.gray80} />
                </TouchableOpacity>
            </TouchableOpacity>
        </>
    );
};