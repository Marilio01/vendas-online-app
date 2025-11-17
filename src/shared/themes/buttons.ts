import { colors } from './colors';

interface ButtonTheme {
  background: string;
  text: string;
  border?: string;
}

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'brand';

export const buttonsTheme: Record<ButtonVariant, ButtonTheme> = {
  primary: {
    background: colors.primary.main,
    text: colors.neutral.surface,
  },
  secondary: {
    background: colors.neutral.surface,
    text: colors.primary.main,
    border: colors.primary.main,
  },
  success: {
    background: colors.semantic.success,
    text: colors.neutral.surface,
  },
  danger: {
    background: colors.semantic.error,
    text: colors.neutral.surface,
  },
  warning: {
    background: colors.semantic.warning,
    text: colors.neutral.surface,
  },
  brand: {
    background: colors.brand.red,
    text: colors.neutral.surface,
  },
};
