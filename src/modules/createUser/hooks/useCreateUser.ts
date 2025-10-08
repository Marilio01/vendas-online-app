import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { MenuUrl } from '../../../shared/enums/MenuUrl.enum';
import { MethodEnum } from '../../../enums/methods.enum';
import { URL_USER } from '../../../shared/constants/urls';
import { useRequests } from '../../../shared/hooks/useRequests';
import { CreateUserType } from '../../../shared/types/createUserType';
import { removeSpecialCharacters } from '../../../shared/functions/characters';
import { validateCpf } from '../../../shared/functions/cpf';
import { validateEmail } from '../../../shared/functions/email';
import { validatePhone } from '../../../shared/functions/phone';
import { validatePassword } from '../../../shared/functions/password';
import { validateName } from '../../../shared/functions/name';

export const useCreateUser = () => {
  const { reset, navigate } = useNavigation<NavigationProp<ParamListBase>>();
  const { request, loading } = useRequests();

  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [values, setValues] = useState<CreateUserType>({
    name: '',
    phone: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    cpf: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const hasAllValues = Object.values(values).every((value) => value);
    const hasNoErrors = Object.values(errors).every((error) => !error);
    setIsFormValid(hasAllValues && hasNoErrors);
  }, [values, errors]);

  const validateField = (field: keyof CreateUserType, currentValues: CreateUserType) => {
    let newError = '';
    const value = currentValues[field];
    switch (field) {
      case 'name':
        if (!value) newError = 'O nome é obrigatório.';
        else if (!validateName(value))
          newError = 'Nome inválido. Não use números ou espaços extras.';
        break;
      case 'phone':
        if (!value) newError = 'O telefone é obrigatório.';
        else if (!validatePhone(value)) newError = 'Telefone inválido.';
        break;
      case 'email':
        if (!value) newError = 'O e-mail é obrigatório.';
        else if (!validateEmail(value)) newError = 'E-mail inválido.';
        break;
      case 'cpf':
        if (!value) newError = 'O CPF é obrigatório.';
        else if (!validateCpf(value)) newError = 'CPF inválido.';
        break;
      case 'password':
        if (!value) newError = 'A senha é obrigatória.';
        else if (!validatePassword(value))
          newError =
            'A senha deve ter 8+ caracteres, com maiúsculas, minúsculas, números e símbolos.';
        break;
      case 'confirmPassword':
        if (!value) newError = 'A confirmação de senha é obrigatória.';
        else if (currentValues.password !== value) newError = 'As senhas não coincidem.';
        break;
      default:
        break;
    }
    return newError;
  };

  const handleBlur = (field: keyof CreateUserType) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newError = validateField(field, values);
    setErrors((prev) => ({ ...prev, [field]: newError }));
  };

  const handleChange = (field: keyof CreateUserType, value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);

    const newErrors = { ...errors };

    if (field === 'password' && touched.confirmPassword) {
      newErrors.confirmPassword = validateField('confirmPassword', newValues);
    }

    if (touched[field]) {
      newErrors[field] = validateField(field, newValues);
    }

    setErrors(newErrors);
  };

  const handleCreateUser = async () => {
    const newErrors = { ...errors };
    let isValid = true;
    (Object.keys(values) as Array<keyof CreateUserType>).forEach((field) => {
      const error = validateField(field, values);
      newErrors[field] = error;
      if (error) isValid = false;
    });
    setErrors(newErrors);

    if (isValid) {
      const result = await request({
        url: URL_USER,
        method: MethodEnum.POST,
        body: {
          ...values,
          phone: removeSpecialCharacters(values.phone),
          cpf: removeSpecialCharacters(values.cpf),
        },
        message: 'Usuário cadastrado com sucesso!',
      });
      if (result) {
        reset({
          index: 0,
          routes: [{ name: MenuUrl.LOGIN }],
        });
      }
    }
  };

  const handleGoToLogin = () => {
    navigate(MenuUrl.LOGIN);
  };

  return {
    values,
    errors,
    loading,
    isFormValid,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleBlur,
    handleCreateUser,
    setShowPassword,
    setShowConfirmPassword,
    handleGoToLogin,
  };
};
