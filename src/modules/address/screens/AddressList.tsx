import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { useAddress } from '../hooks/useAddress';
import { AddressItem } from './AddressItem';
import Button from '../../../shared/components/button/Button';
import * as S from '../styles/addressList.style';
import { useCheckoutContext } from '../../checkout/context/CheckoutContext';
import { AddressType } from '../../../shared/types/AddressType';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../../shared/themes/theme';

export const AddressListScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { addresses, addressLoading, fetchAddresses } = useAddress();
  const { selectedAddress, setSelectedAddress } = useCheckoutContext();

  const [selectedId, setSelectedId] = useState<number | undefined>(selectedAddress?.id);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );

  const handleSelectAddress = (addressId: number) => {
    const found = addresses.find((a) => a.id === addressId);
    if (found) {
      setSelectedAddress(found);
      setSelectedId(addressId);
      navigation.goBack();
    }
  };

  const handleAddNewAddress = () => {
    navigation.navigate('CreateAddress');
  };

  const renderItem = ({ item }: { item: AddressType }) => (
    <AddressItem
      item={item}
      selectedAddressId={selectedId}
      onSelectAddress={handleSelectAddress}
      onDeleteSuccess={fetchAddresses}
    />
  );

  const renderEmptyList = () => (
    <S.EmptyContainer>
      <Icon name="map-pin" size={48} color={theme.colors.neutral.disabled} />
      <S.EmptyText>Nenhum endereço cadastrado</S.EmptyText>
    </S.EmptyContainer>
  );

  return (
    <S.Container>
      <S.AddressList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item: AddressType) => item.id.toString()}
        ListEmptyComponent={
          addressLoading ? (
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
          ) : (
            renderEmptyList
          )
        }
      />

      <S.ButtonWrapper>
        <Button title="Adicionar Novo Endereço" onPress={handleAddNewAddress} variant="primary" />
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default AddressListScreen;
