import { useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from '../../location/hooks/useLocation';

export const useAddressForm = () => {
  const { findCityAndState } = useLocation();

  const [values, setValues] = useState({
    cep: '',
    street: '',
    numberAddress: '',
    complement: '',
    neighborhood: '',
    city: '',
    uf: '',
  });

  const [errors, setErrors] = useState({
    cep: '',
    street: '',
    numberAddress: '',
    neighborhood: '',
  });

  const [cityId, setCityId] = useState<number | undefined>();
  const [cepLoading, setCepLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isStreetReadOnly, setIsStreetReadOnly] = useState(true);
  const [isNeighborhoodReadOnly, setIsNeighborhoodReadOnly] = useState(true);

  const isFormValid = useMemo(() => {
    const hasRequiredValues =
      values.street.trim() &&
      values.numberAddress.trim() &&
      values.neighborhood.trim() &&
      cityId &&
      values.cep.replace(/\D/g, '').length === 8;

    const hasNoErrors = Object.values(errors).every((error) => !error);
    return !!hasRequiredValues && hasNoErrors;
  }, [values, errors, cityId]);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validateField = (field: keyof typeof errors, currentValues: typeof values) => {
    let newError = '';
    const cepDigits = currentValues.cep.replace(/\D/g, '');

    switch (field) {
      case 'cep':
        if (!cepDigits) newError = 'O CEP é obrigatório.';
        else if (cepDigits.length < 8) newError = 'CEP inválido.';
        break;
      case 'numberAddress':
        if (!currentValues.numberAddress.trim()) newError = 'O número é obrigatório.';
        break;
      case 'street':
        if (!currentValues.street.trim()) newError = 'A rua é obrigatória.';
        break;
      case 'neighborhood':
        if (!currentValues.neighborhood.trim()) newError = 'O bairro é obrigatório.';
        break;
    }
    return newError;
  };

  const handleBlur = (field: keyof typeof errors) => {
    setValues((prev) => ({ ...prev, [field]: prev[field].trim() }));

    const trimmedValues = { ...values, [field]: values[field].trim() };
    const newError = validateField(field, trimmedValues);
    setErrors((prev) => ({ ...prev, [field]: newError }));
  };

  const handleCepChange = useCallback(
    async (newCep: string) => {
      setValues((prev) => ({ ...prev, cep: newCep }));
      setApiError('');
      setCityId(undefined);

      if (errors.cep) {
        setErrors((prev) => ({ ...prev, cep: '' }));
      }

      const cleanedCep = newCep.replace(/\D/g, '');

      if (cleanedCep.length < 8) {
        setValues((prev) => ({
          ...prev,
          cep: newCep,
          street: '',
          neighborhood: '',
          city: '',
          uf: '',
        }));
        setIsStreetReadOnly(true);
        setIsNeighborhoodReadOnly(true);
        return;
      }

      if (cleanedCep.length === 8) {
        setCepLoading(true);
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
          const data = response.data;

          if (data.erro) {
            setApiError('CEP não encontrado.');
            setErrors((prev) => ({ ...prev, cep: 'CEP não encontrado.' }));
          } else {
            setValues((prev) => ({
              ...prev,
              street: data.logradouro || '',
              neighborhood: data.bairro || '',
              city: data.localidade || '',
              uf: data.uf || '',
            }));
            setIsStreetReadOnly(!!data.logradouro);
            setIsNeighborhoodReadOnly(!!data.bairro);

            const locationIds = await findCityAndState(data.localidade, data.uf);
            if (locationIds.cityId) {
              setCityId(locationIds.cityId);
            } else {
              setApiError('Cidade não encontrada em nossa base de dados.');
            }
          }
        } catch (error) {
          setApiError('Não foi possível processar o CEP.');
        } finally {
          setCepLoading(false);
        }
      }
    },
    [findCityAndState, errors.cep],
  );

  return {
    addressState: values,
    errors,
    apiError,
    cityId,
    isFormValid,
    cepLoading,
    isStreetReadOnly,
    isNeighborhoodReadOnly,
    handleChange,
    handleBlur,
    handleCepChange,
  };
};
