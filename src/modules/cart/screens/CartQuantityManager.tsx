
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';
import { QuantityManagerContainer } from '../../../shared/components/productThumbnail.tsx/productThumbnail.style';

interface CartQuantityManagerProps {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartQuantityManager = ({ amount, onIncrease, onDecrease }: CartQuantityManagerProps) => {
  return (
   
    <QuantityManagerContainer>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Icon name="minus" size={16} color={theme.colors.neutralTheme.white} />
      </TouchableOpacity>

      <Text style={styles.amount}>{amount}</Text>

      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Icon name="plus" size={16} color={theme.colors.neutralTheme.white} />
      </TouchableOpacity>
    </QuantityManagerContainer>
  );
};


const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20, 
    paddingVertical: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.neutralTheme.white,
  }
});

export default CartQuantityManager;