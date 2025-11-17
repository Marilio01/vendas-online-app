import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../shared/components/button/Button';
import { FloatingLabelInput } from '../../../shared/components/floatingLabelInput/FloatingLabelInput';
import { useAddress } from '../hooks/useAddress';
import { useAddressForm } from '../hooks/useAddressForm';
import { CreateAddressType } from '../../../shared/types/AddressType';
import { ButtonWrapper, StyledKeyboardAwareScrollView, Title } from '../styles/createAddress.style';

const CreateAddressScreen = () => {
  const navigation = useNavigation();
  const { createAddress, addressLoading, addressErrorMessage } = useAddress();
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

  const isButtonDisabled = !isFormValid || addressLoading || cepLoading;

  const handleSaveAddress = async () => {
    if (isButtonDisabled) return;

    const newAddress: CreateAddressType = {
      cep: cep.replace(/\D/g, ''),
      street: street.trim(),
      complement: complement.trim(),
      neighborhood: neighborhood.trim(),
      numberAddress: parseInt(numberAddress.trim(), 10),
      cityId: cityId!,
    };

    await createAddress(newAddress);
    if (!addressErrorMessage) {
      navigation.goBack();
    }
  };

  const getCepError = () => {
    if (apiError) return apiError;
    if (errors.cep) return errors.cep;
    if (addressErrorMessage) return addressErrorMessage;
    return undefined;
  };

  const handleCepSubmit = () => {
    if (!isNeighborhoodReadOnly) {
      bairroRef.current?.focus();
    } else if (!isStreetReadOnly) {
      ruaRef.current?.focus();
    } else {
      numeroRef.current?.focus();
    }
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
        onSubmitEditing={() => ruaRef.current?.focus()}
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
        onSubmitEditing={() => numeroRef.current?.focus()}
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
        onSubmitEditing={() => complementoRef.current?.focus()}
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
          loading={addressLoading}
          disabled={isButtonDisabled}
          variant="primary"
        />
      </ButtonWrapper>
    </StyledKeyboardAwareScrollView>
  );
};

export default CreateAddressScreen;
