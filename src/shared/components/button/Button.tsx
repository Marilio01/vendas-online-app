import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { ButtonText, StyledButton } from './button.style';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  borderRadius?: string;
  withShadow?: boolean;
}

const Button = ({ title, loading, variant = 'primary', borderRadius, withShadow, ...props }: ButtonProps) => {
  return (
    <StyledButton variant={variant} borderRadius={borderRadius} withShadow={withShadow} {...props}>
      {loading ? (
        <ActivityIndicator color={props.disabled ? '#999' : '#FFFFFF'} />
      ) : (
        <ButtonText variant={variant}>{title}</ButtonText>
      )}
    </StyledButton>
  );
};

export default Button;