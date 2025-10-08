import { useCallback, useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useAddressReducer } from '../../../store/reducers/addressReducer/useAddressReducer';
import { AddressType, CreateAddressType } from '../../../shared/types/AddressType';
import { URL_ADDRESS } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';

export const useAddress = () => {
  const { request } = useRequests();
  const { addresses, setAddresses } = useAddressReducer();
  const [addressLoading, setAddressLoading] = useState(false);

  const fetchAddresses = useCallback(async () => {
    setAddressLoading(true);
    const result = await request<AddressType[]>({
        url: URL_ADDRESS,
        method: MethodEnum.GET,
    });
    
    if (result) {
      setAddresses(result);
    }
    
    setAddressLoading(false);
  }, [request, setAddresses]);
  
  const createAddress = useCallback(async (data: CreateAddressType) => {
    setAddressLoading(true);
    await request({
        url: URL_ADDRESS,
        method: MethodEnum.POST,
        body: data,
        message: 'Endereço cadastrado com sucesso!'
    });
    await fetchAddresses();
    setAddressLoading(false);
  }, [request, fetchAddresses]);

  const deleteAddress = useCallback(async (addressId: number) => {
    await request({
        url: `${URL_ADDRESS}/${addressId}`, 
        method: MethodEnum.DELETE, 
        message: 'Endereço removido!'
    });
    await fetchAddresses(); 
  }, [request, fetchAddresses]);

  return {
    addresses,
    addressLoading,
    fetchAddresses,
    createAddress,
    deleteAddress,
  };
};