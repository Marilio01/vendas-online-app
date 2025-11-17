import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { ButtonText, StyledButton } from './button.style';
import { theme } from '../../../shared/themes/theme';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'brand';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  borderRadius?: string;
  withShadow?: boolean;
}

const Button = ({
  title,
  loading,
  variant = 'primary',
  borderRadius,
  withShadow,
  ...props
}: ButtonProps) => {
  const textColor = theme.buttons[variant].text;
  const disabledTextColor = theme.colors.text.secondary;

  return (
    <StyledButton variant={variant} borderRadius={borderRadius} withShadow={withShadow} {...props}>
      {loading ? (
        <ActivityIndicator color={props.disabled ? disabledTextColor : textColor} />
      ) : (
        <ButtonText variant={variant} disabled={props.disabled}>
          {title}
        </ButtonText>
      )}
    </StyledButton>
  );
};

export default Button;
