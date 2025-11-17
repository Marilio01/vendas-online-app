import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaymentType } from '../../modules/payment/hooks/usePayment';

const CHECKOUT_PREFERENCES_KEY = '@Checkout:preferences';

export const saveCheckoutPreferences = async (
  addressId: number | null,
  paymentMethod: PaymentType | null,
) => {
  try {
    const data = JSON.stringify({ addressId, paymentMethod });
    await AsyncStorage.setItem(CHECKOUT_PREFERENCES_KEY, data);
  } catch (e) {
    console.error('Failed to save checkout preferences', e);
  }
};

export const loadCheckoutPreferences = async () => {
  try {
    const data = await AsyncStorage.getItem(CHECKOUT_PREFERENCES_KEY);
    return data != null ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load checkout preferences', e);
    return null;
  }
};

export const clearCheckoutPreferences = async () => {
  try {
    await AsyncStorage.removeItem(CHECKOUT_PREFERENCES_KEY);
  } catch (e) {
    console.error('Failed to clear checkout preferences', e);
  }
};
