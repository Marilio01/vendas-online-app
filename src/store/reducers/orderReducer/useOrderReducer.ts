import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setOrdersAction, clearOrdersAction } from './index';
import { OrderType } from '../../../shared/types/OrderType';

export const useOrderReducer = () => {
  const dispatch = useDispatch();
  const { orders } = useAppSelector((state) => state.orderReducer);

  const setOrders = (currentOrders: OrderType[]) => {
    dispatch(setOrdersAction(currentOrders));
  };

  const clearOrders = () => {
    dispatch(clearOrdersAction());
  };

  return {
    orders,
    setOrders,
    clearOrders,
  };
};
