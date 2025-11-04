import { useRequests } from '../../../shared/hooks/useRequests';
import { CreateOrderDTO } from '../../../shared/types/createOrderDTO';
import { URL_ORDER } from '../../../shared/constants/urls';
import { Alert } from 'react-native';
import { MethodEnum } from '../../../enums/methods.enum';

export const useOrder = () => {
  const { request, loading } = useRequests();

  const createOrder = async (dto: CreateOrderDTO): Promise<boolean> => {
    try {
      await request({
        url: URL_ORDER,
        method: MethodEnum.POST,
        body: dto,
      });

      return true;
    } catch (error: any) {
      Alert.alert(
        'Erro ao criar pedido',
        error?.message || 'Não foi possível completar o pedido. Tente novamente.',
      );
      return false;
    }
  };

  return {
    createOrder,
    orderLoading: loading,
  };
};
