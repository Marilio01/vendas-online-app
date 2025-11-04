import { useState, useEffect } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodEnum } from '../../../enums/methods.enum';
import { URL_USER } from '../../../shared/constants/urls';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { validateName } from '../../../shared/functions/name';
import { UserType } from '../../../shared/types/userType';
import { validatePhone, insertMaskInPhone } from '../../../shared/functions/phone';
import { removeSpecialCharacters } from '../../../shared/functions/characters';

interface ProfileForm {
  name: string;
  phone: string;
}
interface ProfileErrors {
  name?: string;
  phone?: string;
}
type TouchedFields = Partial<Record<keyof ProfileForm, boolean>>;

export const useUpdateUser = () => {
  const { user, setUser } = useUserReducer();
  const { request, loading } = useRequests();
  const { goBack } = useNavigation<NavigationProp<ParamListBase>>();

  const [form, setForm] = useState<ProfileForm>({
    name: user?.name || '',
    phone: insertMaskInPhone(user?.phone || ''),
  });

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        phone: insertMaskInPhone(user.phone || ''),
      });
    }
  }, [user]);

  useEffect(() => {
    const hasNoErrors = Object.values(errors).every((error) => !error);
    const hasValues = form.name && form.phone;

    const pristinePhone = removeSpecialCharacters(form.phone);
    const hasChanged = form.name !== user?.name || pristinePhone !== user?.phone;

    setDisabledButton(!hasNoErrors || !hasValues || !hasChanged);
  }, [form, errors, user]);

  const validateField = (field: keyof ProfileForm, currentValues: ProfileForm) => {
    let newError: string | undefined = undefined;
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
    }
    return newError;
  };

  const handleBlur = (field: keyof ProfileForm) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    const newError = validateField(field, form);
    setErrors((prev) => ({ ...prev, [field]: newError }));
  };

  const handleChange = (field: keyof ProfileForm, value: string) => {
    const newValues = { ...form, [field]: value };
    setForm(newValues);

    if (touchedFields[field]) {
      const newError = validateField(field, newValues);
      setErrors((prev) => ({ ...prev, [field]: newError }));
    }
  };

  const handleUpdateUser = async () => {
    const newErrors: ProfileErrors = {};
    let isValid = true;
    (Object.keys(form) as Array<keyof ProfileForm>).forEach((field) => {
      const error = validateField(field, form);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouchedFields({ name: true, phone: true });

    if (!isValid) return;

    const body = {
      name: form.name.trim(),
      phone: removeSpecialCharacters(form.phone),
    };

    const result = await request<UserType>({
      url: URL_USER,
      method: MethodEnum.PATCH,
      body: body,
      message: 'Perfil alterado com sucesso!',
    });

    if (result && user) {
      setUser({ ...user, name: result.name, phone: result.phone });
      goBack();
    }
  };

  return {
    form,
    errors,
    loading,
    disabledButton,
    handleChange,
    handleBlur,
    handleUpdateUser,
  };
};
