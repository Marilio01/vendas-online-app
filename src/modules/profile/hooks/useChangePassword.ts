import { useState, useEffect } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { URL_USER } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { validatePassword } from '../../../shared/functions/password';

interface PasswordForm {
  lastPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface PasswordErrors {
  lastPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
type TouchedFields = Partial<Record<keyof PasswordForm, boolean>>;

export const useChangePassword = () => {
  const [form, setForm] = useState<PasswordForm>({
    lastPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { request, loading } = useRequests();
  const { goBack } = useNavigation<NavigationProp<ParamListBase>>();

  const [errors, setErrors] = useState<PasswordErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [disabledButton, setDisabledButton] = useState(true);

  const [showLastPassword, setShowLastPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  useEffect(() => {
    const hasNoErrors = Object.values(errors).every((error) => !error);
    const hasValues = form.lastPassword && form.newPassword && form.confirmPassword;
    setDisabledButton(!hasNoErrors || !hasValues);
  }, [form, errors]);

  const validateField = (field: keyof PasswordForm, currentValues: PasswordForm) => {
    let newError: string | undefined = undefined;
    const value = currentValues[field];

    switch (field) {
      case 'lastPassword':
        if (!value) newError = 'A senha atual é obrigatória.';
        break;
      case 'newPassword':
        if (!value) newError = 'A nova senha é obrigatória.';
        else if (!validatePassword(value))
          newError =
            'A senha deve ter 8+ caracteres, com maiúsculas, minúsculas, números e símbolos.';
        else if (value === currentValues.lastPassword)
          newError = 'A nova senha não pode ser igual à senha antiga.';
        break;
      case 'confirmPassword':
        if (!value) newError = 'A confirmação de senha é obrigatória.';
        else if (value !== currentValues.newPassword) newError = 'As senhas não coincidem.';
        break;
    }
    return newError;
  };

  const handleBlur = (field: keyof PasswordForm) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    const newError = validateField(field, form);
    setErrors((prev) => ({ ...prev, [field]: newError }));
  };

  const handleChange = (field: keyof PasswordForm, value: string) => {
    const newValues = { ...form, [field]: value };
    setForm(newValues);

    const newErrors = { ...errors };

    if (field === 'newPassword' && touchedFields.confirmPassword) {
      newErrors.confirmPassword = validateField('confirmPassword', newValues);
    }

    if (touchedFields[field]) {
      newErrors[field] = validateField(field, newValues);
    }

    setErrors(newErrors);
  };

  const handleChangePassword = async () => {
    const newErrors: PasswordErrors = {};
    let isValid = true;
    (Object.keys(form) as Array<keyof PasswordForm>).forEach((field) => {
      const error = validateField(field, form);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouchedFields({ lastPassword: true, newPassword: true, confirmPassword: true });

    if (!isValid) return;

    const body = {
      lastPassword: form.lastPassword,
      newPassword: form.newPassword,
    };

    const result = await request({
      url: `${URL_USER}/password`,
      method: MethodEnum.PATCH,
      body: body,
      message: 'Senha alterada com sucesso!',
    });

    if (result) {
      goBack();
    }
  };

  return {
    form,
    errors,
    loading,
    disabledButton,
    showLastPassword,
    showNewPassword,
    showConfirmPassword,
    handleChange,
    handleBlur,
    handleChangePassword,
    setShowLastPassword,
    setShowNewPassword,
    setShowConfirmPassword,
  };
};
