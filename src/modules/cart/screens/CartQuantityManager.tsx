import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../../shared/themes/theme';
import { Amount, Button, Container } from '../styles/CartQuantityManager.style';

interface CartQuantityManagerProps {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemoveRequest: () => void;
}

const CartQuantityManager = ({
  amount,
  onIncrease,
  onDecrease,
  onRemoveRequest,
}: CartQuantityManagerProps) => {
  const iconColor = theme.colors.primary.main;

  return (
    <Container>
      <Button
        onPress={() => {
          if (amount === 1) {
            onRemoveRequest();
          } else {
            onDecrease();
          }
        }}
      >
        <Icon name="minus" size={16} color={theme.colors.primary.main} />
      </Button>

      <Amount>{amount}</Amount>

      <Button onPress={onIncrease}>
        <Icon name="plus" size={16} color={theme.colors.primary.main} />
      </Button>
    </Container>
  );
};

export default CartQuantityManager;
