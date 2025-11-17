import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { MenuUrl } from '../../enums/MenuUrl.enum';
import { removeItemStorage, setItemStorage, getItemStorage } from '../storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = async (token: string) =>
  setItemStorage(AUTHORIZATION_KEY, token);

export const getAuthorizationToken = async () => getItemStorage(AUTHORIZATION_KEY);

export const logout = (navigation: NavigationProp<ParamListBase>) => {
  unsetAuthorizationToken();

  Toast.show({
    type: 'success',
    text1: 'Sessão encerrada com sucesso!',
    text2: 'Até a próxima!',
  });

  navigation.reset({
    index: 0,
    routes: [{ name: MenuUrl.FIRST_SCREEN }],
  });
};
