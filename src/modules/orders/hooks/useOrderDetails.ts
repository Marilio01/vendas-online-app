import { useState, useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { OrderType } from '../../../shared/types/OrderType';
import { URL_ORDER_ID } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';

export const useOrderDetails = () => {
  const { request, loading } = useRequests();
  const [orderDetails, setOrderDetails] = useState<OrderType>();

  const fetchOrderDetails = useCallback(
    async (orderId: number) => {
      setOrderDetails(undefined);

      const result = await request<OrderType>({
        url: `${URL_ORDER_ID}/${orderId}`,
        method: MethodEnum.GET,
      });

      if (result) {
        setOrderDetails(result);
      }
    },
    [request],
  );

  return {
    orderDetails,
    loading,
    fetchOrderDetails,
  };
};
