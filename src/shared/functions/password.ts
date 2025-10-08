export const validatePassword = (password: string): boolean => {
  if (!password) {
    return false;
  }

  const hasMinLength = password.length >= 8;

  const hasUpperCase = /[A-Z]/.test(password);

  const hasLowerCase = /[a-z]/.test(password);

  const hasNumber = /[0-9]/.test(password);

  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);

  return (
    hasMinLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};