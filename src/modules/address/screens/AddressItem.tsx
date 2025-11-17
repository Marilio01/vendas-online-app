import React, { useState } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAddress } from '../hooks/useAddress';
import { AddressType } from '../../../shared/types/AddressType';
import Button from '../../../shared/components/button/Button';
import { theme } from '../../../shared/themes/theme';
import {
  AddressItemContainer,
  SelectedAddressItem,
  AddressContent,
  AddressText,
  AddressTextSecondary,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalText,
} from '../styles/addressList.style';

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
    const addressId = deleteModal.id;

    setDeleteModal({ visible: false });

    if (addressId) {
      try {
        await deleteAddress(addressId);
        onDeleteSuccess();
      } catch (error) {}
    }
  };

  const ItemComponent = selectedAddressId === item.id ? SelectedAddressItem : AddressItemContainer;

  return (
    <>
      <Modal
        transparent
        visible={deleteModal.visible}
        onRequestClose={() => setDeleteModal({ visible: false })}
        animationType="fade"
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>Remover Endereço</ModalTitle>
            <ModalText>Tem certeza que deseja remover este endereço?</ModalText>
            <Button
              title="Cancelar"
              onPress={() => setDeleteModal({ visible: false })}
              variant="secondary"
            />
            <View style={{ height: 8 }} />
            <Button title="Sim, remover" onPress={confirmDelete} variant="danger" />
          </ModalContainer>
        </ModalOverlay>
      </Modal>

      <ItemComponent onPress={() => onSelectAddress(item.id)}>
        <Icon
          name={selectedAddressId === item.id ? 'check-circle' : 'circle'}
          size={20}
          color={
            selectedAddressId === item.id ? theme.colors.primary.main : theme.colors.primary.main
          }
        />
        <AddressContent>
          <AddressText>{`${item.street}, ${item.numberAddress}`}</AddressText>
          <AddressTextSecondary>
            {`${item.neighborhood} - ${item.city?.name}/${item.city?.state?.uf}`}
          </AddressTextSecondary>
        </AddressContent>
        <TouchableOpacity onPress={() => setDeleteModal({ visible: true, id: item.id })}>
          <Icon name="trash-2" size={20} color={theme.colors.semantic.error} />
        </TouchableOpacity>
      </ItemComponent>
    </>
  );
};

export default AddressItem;
