export const colors = {
  primary: {
    main: '#002244',
    dark: '#001122',
    light: '#E6EAF0',
  },

  brand: {
    red: '#CC3333',
    redLight: '#FBEBEB',
  },

  neutral: {
    black: '#252525',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#252525',
    textSecondary: '#757575',
    border: '#E1E1E1',
    disabled: '#CED4DA',
  },

  semantic: {
    success: '#28A745',
    warning: '#E7774D',
    error: '#D93030',
  },
};

export const textTheme = {
  primary: colors.neutral.textPrimary,
  secondary: colors.neutral.textSecondary,
};

export const inputTheme = {
  primary: colors.neutral.textSecondary,
  secondary: colors.neutral.border,
};
