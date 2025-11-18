import React, { useRef } from 'react';
import { TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../shared/components/button/Button';
import { FloatingLabelInput } from '../../../shared/components/floatingLabelInput/FloatingLabelInput';
import { useAddressForm } from '../hooks/useAddressForm';
import { CreateAddressType } from '../../../shared/types/AddressType';
import { ButtonWrapper, StyledKeyboardAwareScrollView, Title } from '../styles/createAddress.style';

const CreateAddressScreen = () => {
  const navigation = useNavigation();

  const {
    addressState,
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
  } = useAddressForm();

  const { cep, street, numberAddress, complement, neighborhood, city, uf } = addressState;

  const bairroRef = useRef<TextInput>(null);
  const ruaRef = useRef<TextInput>(null);
  const numeroRef = useRef<TextInput>(null);
  const complementoRef = useRef<TextInput>(null);

  const isButtonDisabled = !isFormValid || cepLoading;

  // ⛔️ NÃO SALVA MAIS AQUI — abre MAPA antes
  const handleSaveAddress = () => {
    if (isButtonDisabled || !cityId) return;

    const basicAddress: CreateAddressType = {
      cep: cep.replace(/\D/g, ''),
      street: street.trim(),
      complement: complement?.trim() || '',
      neighborhood: neighborhood.trim(),
      numberAddress: parseInt(numberAddress.trim(), 10),
      cityId: cityId!,
    };

    Alert.alert(
      'Confirme no mapa',
      'Agora selecione no mapa o local aproximado do endereço.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            (navigation as any).navigate('SelectLocation', { address: basicAddress });

          },
        },
      ],
      { cancelable: false },
    );
  };

  const getCepError = () => {
    if (apiError) return apiError;
    if (errors.cep) return errors.cep;
    return undefined;
  };

  const handleCepSubmit = () => {
    if (!isNeighborhoodReadOnly) bairroRef.current?.focus();
    else if (!isStreetReadOnly) ruaRef.current?.focus();
    else numeroRef.current?.focus();
  };

  return (
    <StyledKeyboardAwareScrollView>
      <Title>Novo Endereço</Title>

      <FloatingLabelInput
        label="CEP"
        value={cep}
        onChangeText={handleCepChange}
        onBlur={() => handleBlur('cep')}
        type="cep"
        keyboardType="numeric"
        maxLength={9}
        loading={cepLoading}
        error={getCepError()}
        returnKeyType="next"
        onSubmitEditing={handleCepSubmit}
      />

      <FloatingLabelInput label="Estado (UF)" value={uf} editable={false} />
      <FloatingLabelInput label="Cidade" value={city} editable={false} />

      <FloatingLabelInput
        ref={bairroRef}
        label="Bairro"
        value={neighborhood}
        onChangeText={(text) => handleChange('neighborhood', text)}
        onBlur={() => handleBlur('neighborhood')}
        editable={!isNeighborhoodReadOnly}
        error={errors.neighborhood}
        returnKeyType="next"
      />

      <FloatingLabelInput
        ref={ruaRef}
        label="Rua"
        value={street}
        onChangeText={(text) => handleChange('street', text)}
        onBlur={() => handleBlur('street')}
        editable={!isStreetReadOnly}
        error={errors.street}
        returnKeyType="next"
      />

      <FloatingLabelInput
        ref={numeroRef}
        label="Número"
        value={numberAddress}
        onChangeText={(text) => handleChange('numberAddress', text)}
        onBlur={() => handleBlur('numberAddress')}
        keyboardType="numeric"
        error={errors.numberAddress}
        returnKeyType="next"
      />

      <FloatingLabelInput
        ref={complementoRef}
        label="Complemento (Opcional)"
        value={complement}
        onChangeText={(text) => handleChange('complement', text)}
        returnKeyType="done"
        onSubmitEditing={handleSaveAddress}
      />

      <ButtonWrapper>
        <Button
          title="Salvar Endereço"
          onPress={handleSaveAddress}
          loading={false}
          disabled={isButtonDisabled}
          variant="primary"
        />
      </ButtonWrapper>
    </StyledKeyboardAwareScrollView>
  );
};

export default CreateAddressScreen;