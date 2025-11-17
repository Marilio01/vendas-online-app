import React from 'react';
import { BadgeContainer, BadgeText } from './cartBadge.style';

export function CartBadge({ value }: { value: number }) {
  if (value === 0) return null;

  return (
    <BadgeContainer>
      <BadgeText>{value}</BadgeText>
    </BadgeContainer>
  );
}
