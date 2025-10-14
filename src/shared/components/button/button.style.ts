import styled, { DefaultTheme, css } from 'styled-components/native';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  borderRadius?: string;
  withShadow?: boolean;
}

type PropsWithTheme = ButtonProps & { theme: DefaultTheme };

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 46px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: ${({ borderRadius = '34px' }) => borderRadius};

  background-color: ${({ variant = 'primary', disabled, theme }: PropsWithTheme) => {
    if (disabled) {
      return theme.colors.grayTheme.grayDisabled;
    }
    return theme.buttons[variant].background;
  }};

  border-width: ${({ variant = 'primary', theme }: PropsWithTheme) =>
    theme.buttons[variant].border ? '1px' : '0px'};
  
  border-color: ${({ variant = 'primary', theme }: PropsWithTheme) =>
    theme.buttons[variant].border || 'transparent'};

  ${({ withShadow, theme }: PropsWithTheme) =>
    withShadow &&
    css`
      elevation: 5;
      shadow-color: ${theme.colors.neutralTheme.black};
      shadow-offset: 0px 4px;
      shadow-opacity: 0.25;
      shadow-radius: 6px;
    `}
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-weight: 500;
  font-size: 15px;
  color: ${({ variant = 'primary', theme }: PropsWithTheme) => {
    return theme.buttons[variant].text;
  }};
`;