import { useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { OrderType } from '../../../shared/types/OrderType';
import { URL_ORDER } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';
import { useOrderReducer } from '../../../store/reducers/orderReducer/useOrderReducer';

export const useOrderList = () => {
  const { request, loading } = useRequests();
  const { orders, setOrders } = useOrderReducer();

  const fetchUserOrders = useCallback(async () => {
    const result = await request<OrderType[]>({
      url: URL_ORDER,
      method: MethodEnum.GET,
      saveGlobal: setOrders,
      showErrorToast: false,
    });

    if (!result) {
      setOrders([]);
    }
  }, [request, setOrders]);

  return {
    orders,
    listLoading: loading,
    refetchUserOrders: fetchUserOrders,
  };
};
