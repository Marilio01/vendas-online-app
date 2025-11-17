import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { validateEmail } from '../../../shared/functions/email';
import Toast from 'react-native-toast-message';
import { Keyboard } from 'react-native';

type LoginRouteParams = {
  Login: {
    toastMessage?: string;
    toastMessageText2?: string;
  };
};

export const useLogin = () => {
  const { navigate, setParams } = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<LoginRouteParams, 'Login'>>();
  const { authRequest, errorMessage: apiErrorMessage, loading, setErrorMessage } = useRequests();

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const message = route.params?.toastMessage;
    const message2 = route.params?.toastMessageText2;

    if (message) {
      Toast.show({
        type: 'success',
        text1: message,
        text2: message2,
        position: 'bottom',
        visibilityTime: 3000,
      });
      setParams({ toastMessage: undefined, toastMessageText2: undefined });
    }
  }, [route.params?.toastMessage, setParams]);

  useEffect(() => {
    const hasAllValues = Object.values(values).every((value) => value);
    const hasNoErrors = Object.values(errors).every((error) => !error);
    setIsFormValid(hasAllValues && hasNoErrors);
  }, [values, errors]);

  const validateField = (field: 'email' | 'password', currentValues: typeof values) => {
    let newError = '';
    const value = currentValues[field];

    if (field === 'email') {
      if (!value) newError = 'O e-mail é obrigatório.';
      else if (!validateEmail(value)) newError = 'E-mail inválido.';
    }

    if (field === 'password') {
      if (!value) newError = 'A senha é obrigatória.';
    }

    return newError;
  };

  const handleChange = (field: 'email' | 'password', value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);

    if (apiErrorMessage) {
      setErrorMessage('');
    }

    if (errors[field]) {
      handleBlur(field, newValues);
    }
  };

  const handleBlur = (field: 'email' | 'password', currentValues?: typeof values) => {
    const newError = validateField(field, currentValues || values);
    setErrors((prev) => ({ ...prev, [field]: newError }));
  };

  const handleOnPress = async () => {
    Keyboard.dismiss();
    const newErrors = { email: '', password: '' };
    let isValid = true;

    (Object.keys(values) as Array<'email' | 'password'>).forEach((field) => {
      const error = validateField(field, values);
      newErrors[field] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);

    if (isValid) {
      await authRequest({
        email: values.email,
        password: values.password,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Formulário inválido',
        text2: 'Por favor, verifique os campos em vermelho.',
        position: 'bottom',
      });
    }
  };

  const handleGoToCreateUser = () => {
    navigate(MenuUrl.CREATE_USER);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    values,
    errors,
    showPassword,
    loading,
    apiErrorMessage,
    isFormValid,
    handleOnPress,
    handleChange,
    handleBlur,
    handleGoToCreateUser,
    handleToggleShowPassword,
  };
};
