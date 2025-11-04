import { useState, useCallback, useEffect } from 'react'; // Importe o useEffect
import { useRequests } from '../../../shared/hooks/useRequests';
import { OrderType } from '../../../shared/types/OrderType';
import { URL_ORDER } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';

export const useOrderList = () => {
  const { request, loading } = useRequests();
  const [orders, setOrders] = useState<OrderType[]>([]);

  const fetchUserOrders = useCallback(async () => {
    if (loading || orders.length > 0) {
    }

    const result = await request<OrderType[]>({
      url: URL_ORDER,
      method: MethodEnum.GET,
    });

    if (result) {
      setOrders(result);
    }
  }, [request, loading, orders.length]);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);
  return {
    orders,
    listLoading: loading,
    refetchUserOrders: fetchUserOrders,
  };
};
