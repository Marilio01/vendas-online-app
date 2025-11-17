const AVATAR_COLORS = ['#6C63FF', '#FF6B6B', '#4ECCA3', '#FFC93C', '#2C7873', '#007BFF'];

export const getInitials = (name?: string): string => {
  if (!name) return '?';

  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '?';

  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';

  return `${first}${last}`.toUpperCase();
};

export const getAvatarColor = (name?: string): string => {
  if (!name) return AVATAR_COLORS[0];

  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const index = hash % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};
