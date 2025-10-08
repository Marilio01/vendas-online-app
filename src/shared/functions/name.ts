export const validateName = (name: string): boolean => {
  if (!name) {
    return false;
  }

  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return false;
  }

  if (name !== trimmedName) {
    return false;
  }

  const hasNumbers = /\d/.test(trimmedName);
  if (hasNumbers) {
    return false;
  }

  return true;
};