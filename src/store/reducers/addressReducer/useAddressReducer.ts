import { useDispatch } from 'react-redux';
import { AddressType } from '../../../shared/types/AddressType';
import { useAppSelector } from '../../hooks';
import { setAddressesAction } from '.';

export const useAddressReducer = () => {
  const dispatch = useDispatch();
  const { addresses } = useAppSelector((state) => state.addressReducer);

  const setAddresses = (currentAddresses: AddressType[]) => {
    dispatch(setAddressesAction(currentAddresses));
  };

  return {
    addresses,
    setAddresses,
  };
};