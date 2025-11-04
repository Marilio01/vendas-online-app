import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import { FloatingLabelInput } from '../../../shared/components/floatingLabelInput/FloatingLabelInput';
import { useUpdateUser } from '../hooks/useUpdateUser';
import {
  Container,
  ContentContainer,
  FormSection,
  Title,
  ButtonWrapper,
} from '../styles/profileForm.style';
import Button from '../../../shared/components/button/Button';

export const EditProfileScreen = () => {
  const { form, errors, disabledButton, loading, handleChange, handleBlur, handleUpdateUser } =
    useUpdateUser();

  const phoneRef = useRef<TextInput>(null);

  return (
    <Container>
      <ContentContainer>
        <FormSection>
          <Title>Alterar Dados</Title>

          <FloatingLabelInput
            label="Nome"
            value={form.name}
            onChangeText={(v) => handleChange('name', v)}
            onBlur={() => handleBlur('name')}
            error={errors.name}
            editable={!loading}
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
          />

          <FloatingLabelInput
            ref={phoneRef}
            label="Telefone"
            value={form.phone}
            onChangeText={(v) => handleChange('phone', v)}
            onBlur={() => handleBlur('phone')}
            error={errors.phone}
            editable={!loading}
            type="cel-phone"
            maxLength={15}
            returnKeyType="done"
            onSubmitEditing={!disabledButton ? handleUpdateUser : undefined}
          />

          <ButtonWrapper>
            <Button
              title="Salvar Alterações"
              onPress={handleUpdateUser}
              disabled={disabledButton || loading}
              loading={loading}
            />
          </ButtonWrapper>
        </FormSection>
      </ContentContainer>
    </Container>
  );
};

export default EditProfileScreen;
