import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useUserReducer } from '../../store/reducers/userReducer/useUserReducer';
import { useCartReducer } from '../../store/reducers/cartReducer/useCartReducer';
import { useAddressReducer } from '../../store/reducers/addressReducer/useAddressReducer';
import { useOrderReducer } from '../../store/reducers/orderReducer/useOrderReducer';
import { useCheckoutContext } from '../../modules/checkout/context/CheckoutContext';
import { clearCheckoutPreferences } from '../functions/checkoutPreferences';
import { logout } from '../functions/connection/auth';

export const useAuth = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { clearUser } = useUserReducer();
  const { clearCart } = useCartReducer();
  const { clearAddresses } = useAddressReducer();
  const { clearOrders } = useOrderReducer();
  const { clearCheckout } = useCheckoutContext();

  const handleLogout = async () => {
    clearUser();
    clearCart();
    clearAddresses();
    clearOrders();
    clearCheckout();
    await clearCheckoutPreferences();
    logout(navigation);
  };

  return {
    handleLogout,
  };
};
