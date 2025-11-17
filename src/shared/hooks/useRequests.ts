import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useState, useCallback, useMemo } from 'react';
import { useUserReducer } from '../../store/reducers/userReducer/useUserReducer';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { setAuthorizationToken } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionAPI';
import { RequestLogin } from '../types/requestLogin';
import { ReturnLogin } from '../types/returnLogin';
import { MenuUrl } from '../enums/MenuUrl.enum';
import { useCartReducer } from '../../store/reducers/cartReducer/useCartReducer';
import { CartType } from '../types/cartType';
import { URL_CART } from '../constants/urls';
import { MethodEnum } from '../../enums/methods.enum';
import Toast from 'react-native-toast-message';

interface requestProps<T, B = unknown> {
  url: string;
  method: MethodType;
  saveGlobal?: (object: T) => void;
  body?: B;
  message?: string;
  showErrorToast?: boolean;
}

const translateErrorMessage = (error: any): { text1: string; text2: string } => {
  const defaultTitle = 'Erro';
  const errorText =
    error?.response?.data?.message || error?.message || 'Houve um problema. Tente novamente.';

  if (errorText.includes('Address is associated')) {
    return {
      text1: 'Atenção',
      text2: 'Impossível deletar. Este endereço já está utilizado em um pedido.',
    };
  }

  if (errorText.includes('Network request failed')) {
    return {
      text1: 'Erro de Conexão',
      text2: 'Não foi possível conectar ao servidor.',
    };
  }

  return {
    text1: defaultTitle,
    text2: errorText,
  };
};

export const useRequests = () => {
  const { setCart } = useCartReducer();
  const { reset } = useNavigation<NavigationProp<ParamListBase>>();
  const { setUser } = useUserReducer();
  const { setModal } = useGlobalReducer();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const request = useCallback(
    async <T, B = unknown>({
      url,
      method,
      saveGlobal,
      body,
      message,
      showErrorToast = true,
    }: requestProps<T, B>): Promise<T | undefined> => {
      setLoading(true);
      try {
        const result = await ConnectionAPI.connect<T, B>(url, method, body);
        if (saveGlobal) saveGlobal(result);
        if (message) {
          Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: message,
            position: 'bottom',
          });
        }
        return result;
      } catch (error: any) {
        if (showErrorToast) {
          const { text1, text2 } = translateErrorMessage(error);
          Toast.show({
            type: 'error',
            text1: text1,
            text2: text2,
            position: 'bottom',
            visibilityTime: 3000,
          });
        }
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [setModal, setLoading],
  );

  const authRequest = useCallback(
    async (body: RequestLogin) => {
      setLoading(true);
      try {
        const result = await connectionAPIPost<ReturnLogin>(
          'http://10.0.0.107:8080/auth',
          body,
        );
        setAuthorizationToken(result.accessToken);
        setUser(result.user);

        const cart = await request<CartType>({
          url: URL_CART,
          method: MethodEnum.GET,
          showErrorToast: false,
        });

        if (cart) {
          setCart(cart);
        }

        Toast.show({
          type: 'success',
          text1: 'Sessão iniciada com sucesso!',
          text2: 'Seja bem-vindo de volta.',
          position: 'bottom',
        });

        reset({
          index: 0,
          routes: [{ name: MenuUrl.HOME }],
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Falha no Login',
          text2: 'Usuário ou senha inválidos. Tente novamente.',
          position: 'bottom',
        });
      } finally {
        setLoading(false);
      }
    },
    [reset, setModal, setUser, request, setCart, setLoading],
  );

  return useMemo(
    () => ({
      loading,
      errorMessage,
      request,
      authRequest,
      setErrorMessage,
    }),
    [loading, errorMessage, request, authRequest, setErrorMessage],
  );
};
