import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setAddressesAction, clearAddressesAction } from './index';
import { AddressType } from '../../../shared/types/AddressType';

export const useAddressReducer = () => {
  const dispatch = useDispatch();
  const { addresses } = useAppSelector((state) => state.addressReducer);

  const setAddresses = (currentAddresses: AddressType[]) => {
    dispatch(setAddressesAction(currentAddresses));
  };

  const clearAddresses = () => {
    dispatch(clearAddressesAction());
  };

  return {
    addresses,
    setAddresses,
    clearAddresses,
  };
};
