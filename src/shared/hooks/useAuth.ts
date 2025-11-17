import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useUserReducer } from '../../store/reducers/userReducer/useUserReducer';
import { useCartReducer } from '../../store/reducers/cartReducer/useCartReducer';
import { useAddressReducer } from '../../store/reducers/addressReducer/useAddressReducer';

import { logout } from '../functions/connection/auth';
import { useOrderReducer } from '../../store/reducers/orderReducer/useOrderReducer';

export const useAuth = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { clearUser } = useUserReducer();
  const { clearCart } = useCartReducer();
  const { clearAddresses } = useAddressReducer();
  const { clearOrders } = useOrderReducer();

  const handleLogout = () => {
    clearUser();
    clearCart();
    clearAddresses();
    clearOrders();

    logout(navigation);
  };

  return {
    handleLogout,
  };
};
