import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@lastCheckoutPreferences';

export const saveCheckoutPreferences = async (
  addressId: number | null,
  paymentMethod: string | null,
) => {
  try {
    const data = JSON.stringify({ addressId, paymentMethod });
    await AsyncStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error('Erro ao salvar preferências do checkout:', error);
  }
};

export const loadCheckoutPreferences = async (): Promise<{
  addressId?: number;
  paymentMethod?: string;
} | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar preferências do checkout:', error);
    return null;
  }
};

export const clearCheckoutPreferences = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
