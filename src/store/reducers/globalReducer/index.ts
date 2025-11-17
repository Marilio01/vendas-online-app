import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GlobalModalType } from '../../../shared/components/modal/globalModal/GlobalModal';

interface GlobalStore {
  modal: GlobalModalType;
}

const initialState: GlobalStore = {
  modal: {
    visible: false,
    text: '',
    title: '',
    type: 'info',
  },
};

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setModalAction: (state, action: PayloadAction<Partial<GlobalModalType>>) => {
      state.modal = {
        ...state.modal,
        ...action.payload,
      };
    },
  },
});

export const { setModalAction } = globalSlice.actions;

export default globalSlice.reducer;
