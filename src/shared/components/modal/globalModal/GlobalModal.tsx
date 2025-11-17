import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import Modal from '../Modal';

export interface GlobalModalType {
  visible: boolean;
  title: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

const GlobalModal = () => {
  const { modal, closeModal } = useGlobalReducer();

  return (
    <Modal
      title={modal.title}
      text={modal.text}
      visible={modal.visible}
      onCloseModal={closeModal}
      type={modal.type}
    />
  );
};

export default GlobalModal;
