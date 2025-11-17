import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setModalAction } from '.';
import { GlobalModalType } from './../../../shared/components/modal/globalModal/GlobalModal';
import { useCallback } from 'react';

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.globalReducer);

  const closeModal = useCallback(() => {
    dispatch(setModalAction({ visible: false }));
  }, [dispatch]);

  const setModal = useCallback(
    (currentModal: Partial<GlobalModalType>) => {
      dispatch(setModalAction(currentModal));
    },
    [dispatch],
  );

  return { modal, closeModal, setModal };
};
