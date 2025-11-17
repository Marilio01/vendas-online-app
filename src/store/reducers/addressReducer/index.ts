import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressType } from '../../../shared/types/AddressType';

interface AddressState {
  addresses: AddressType[];
}

const initialState: AddressState = {
  addresses: [],
};

export const addressSlice = createSlice({
  name: 'addressReducer',
  initialState,
  reducers: {
    setAddressesAction: (state, action: PayloadAction<AddressType[]>) => {
      state.addresses = action.payload;
    },
    clearAddressesAction: (state) => {
      state.addresses = initialState.addresses;
    },
  },
});

export const { setAddressesAction, clearAddressesAction } = addressSlice.actions;

export default addressSlice.reducer;
