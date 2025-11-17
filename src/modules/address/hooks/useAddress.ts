import { useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useAddressReducer } from '../../../store/reducers/addressReducer/useAddressReducer';
import { AddressType, CreateAddressType } from '../../../shared/types/AddressType';
import { URL_ADDRESS } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';

export const useAddress = () => {
  const { request, loading, errorMessage, setErrorMessage } = useRequests();
  const { addresses, setAddresses, clearAddresses } = useAddressReducer();

  const fetchAddresses = useCallback(async () => {
    const result = await request<AddressType[]>({
      url: URL_ADDRESS,
      method: MethodEnum.GET,
      saveGlobal: setAddresses,
      showErrorToast: false,
    });

    if (!result) {
      setAddresses([]);
    }
  }, [request, setAddresses]);

  const createAddress = useCallback(
    async (data: CreateAddressType) => {
      const result = await request({
        url: URL_ADDRESS,
        method: MethodEnum.POST,
        body: data,
        message: 'Endereço cadastrado com sucesso!',
      });

      if (result) {
        await fetchAddresses();
      }
    },
    [request, fetchAddresses],
  );

  const deleteAddress = useCallback(
    async (addressId: number): Promise<boolean> => {
      const result = await request<{ success: boolean }>({
        url: `${URL_ADDRESS}/${addressId}`,
        method: MethodEnum.DELETE,
      });

      if (result) {
        setAddresses(addresses.filter((addr) => addr.id !== addressId));
        return true;
      }

      return false;
    },
    [request, addresses, setAddresses],
  );

  return {
    addresses,
    addressLoading: loading,
    addressErrorMessage: errorMessage,
    setAddressErrorMessage: setErrorMessage,
    fetchAddresses,
    createAddress,
    deleteAddress,
    clearAddresses,
  };
};
