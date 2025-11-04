import React, { useState } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';

import { useAddress } from '../hooks/useAddress';
import { AddressType } from '../../../shared/types/AddressType';
import Text from '../../../shared/components/text/Text';
import Button from '../../../shared/components/button/Button';
import { Icon } from '../../../shared/components/icon/Icon';
import { theme } from '../../../shared/themes/theme';
import { styles } from '../../checkout/styles/checkout.style';

interface AddressItemProps {
  item: AddressType;
  selectedAddressId?: number;
  onSelectAddress: (addressId: number) => void;
  onDeleteSuccess: () => void;
}

export const AddressItem = ({
  item,
  selectedAddressId,
  onSelectAddress,
  onDeleteSuccess,
}: AddressItemProps) => {
  const { deleteAddress } = useAddress();
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id?: number }>({
    visible: false,
  });

  const confirmDelete = async () => {
    if (deleteModal.id) {
      await deleteAddress(deleteModal.id);
      onDeleteSuccess();
      setDeleteModal({ visible: false });
    }
  };

  return (
    <>
      <Modal
        transparent={true}
        visible={deleteModal.visible}
        onRequestClose={() => setDeleteModal({ visible: false })}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remover Endereço</Text>
            <Text style={styles.modalText}>Tem certeza que deseja remover este endereço?</Text>
            <Button
              title="Cancelar"
              onPress={() => setDeleteModal({ visible: false })}
              variant="secondary"
            />
            <Button title="Sim, remover" onPress={confirmDelete} variant="danger" />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.addressItem, selectedAddressId === item.id && styles.selectedAddressItem]}
        onPress={() => onSelectAddress(item.id)}
      >
        <Icon
          name={selectedAddressId === item.id ? 'radio-checked' : 'radio-unchecked'}
          size={20}
          color={theme.colors.mainTheme.primary}
        />
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
