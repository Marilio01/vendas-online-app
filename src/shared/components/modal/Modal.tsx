import React from 'react';
import {
  Alert,
  Modal as ModalReact,
  ModalProps as ModalPropsReact,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Button from '../button/Button';
import {
  ContainerModal,
  ModalOverlay,
  Title,
  BodyText,
  ButtonWrapper,
  IconWrapper,
} from './modal.style';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../themes/theme';

interface ModalProps extends ModalPropsReact {
  title: string;
  text: string;
  onCloseModal: () => void;
  type?: 'success' | 'error' | 'info';
}

const Modal = ({ title, text, onCloseModal, type = 'info', ...props }: ModalProps) => {
  const buttonVariant = type === 'error' ? 'danger' : 'success';

  const renderIcon = () => {
    let iconName: string;
    let iconColor: string;

    switch (type) {
      case 'success':
        iconName = 'check-circle';
        iconColor = theme.colors.semantic.success;
        break;
      case 'error':
        iconName = 'alert-circle';
        iconColor = theme.colors.semantic.error;
        break;
      case 'info':
      default:
        iconName = 'info-circle';
        iconColor = theme.colors.primary.main;
        break;
    }

    return (
      <IconWrapper>
        <Icon name={iconName} size={52} color={iconColor} />
      </IconWrapper>
    );
  };

  return (
    <ModalReact
      animationType="fade"
      transparent
      onRequestClose={() => {
        Alert.alert('Modal fechado.');
        onCloseModal();
      }}
      {...props}
    >
      <ModalOverlay>
        <TouchableOpacity
          style={{ ...StyleSheet.absoluteFillObject }}
          activeOpacity={1}
          onPress={onCloseModal}
        />
        <ContainerModal>
          {renderIcon()}
          <Title>{title}</Title>
          <BodyText>{text}</BodyText>
          <ButtonWrapper>
            <Button title="OK" onPress={onCloseModal} variant={buttonVariant} borderRadius="8px" />
          </ButtonWrapper>
        </ContainerModal>
      </ModalOverlay>
    </ModalReact>
  );
};

export default Modal;
