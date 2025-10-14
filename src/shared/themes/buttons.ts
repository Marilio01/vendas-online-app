import { mainTheme, neutralTheme, greenTheme, redTheme, orangeTheme, blueTheme } from './colors';

interface ButtonTheme {
  background: string;
  text: string;
  border?: string;
}

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

export const buttonsTheme: Record<ButtonVariant, ButtonTheme> = {
  primary: {
    background: blueTheme.primary,
    text: neutralTheme.white,
  },
  secondary: {
    background: 'transparent',
    text: blueTheme.primary,
    border: blueTheme.primary,
  },
  success: {
    background: greenTheme.green,
    text: neutralTheme.white,
  },
  danger: {
    background: redTheme.red,
    text: neutralTheme.white,
  },
  warning: {
    background: mainTheme.primary,
    text: neutralTheme.white,
  },
};