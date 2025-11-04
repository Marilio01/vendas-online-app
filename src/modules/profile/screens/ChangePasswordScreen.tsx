import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import { FloatingLabelInput } from '../../../shared/components/floatingLabelInput/FloatingLabelInput';
import { useChangePassword } from '../hooks/useChangePassword';
import {
  Container,
  ContentContainer,
  FormSection,
  Title,
  ButtonWrapper,
} from '../styles/profileForm.style';
import Button from '../../../shared/components/button/Button';

export const ChangePasswordScreen = () => {
  const {
    form,
    errors,
    disabledButton,
    loading,
    showLastPassword,
    showNewPassword,
    showConfirmPassword,
    handleChange,
    handleBlur,
    handleChangePassword,
    setShowLastPassword,
    setShowNewPassword,
    setShowConfirmPassword,
  } = useChangePassword();

  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <Container>
      <ContentContainer>
        <FormSection>
          <Title>Alterar Senha</Title>

          <FloatingLabelInput
            label="Senha Atual"
            value={form.lastPassword}
            onChangeText={(v) => handleChange('lastPassword', v)}
            onBlur={() => handleBlur('lastPassword')}
            error={errors.lastPassword}
            editable={!loading}
            isPasswordInput={true}
            secureTextEntry={showLastPassword}
            onToggleVisibility={() => setShowLastPassword((prev) => !prev)}
            returnKeyType="next"
            onSubmitEditing={() => newPasswordRef.current?.focus()}
          />
          <FloatingLabelInput
            ref={newPasswordRef}
            label="Nova Senha"
            value={form.newPassword}
            onChangeText={(v) => handleChange('newPassword', v)}
            onBlur={() => handleBlur('newPassword')}
            error={errors.newPassword}
            editable={!loading}
            isPasswordInput={true}
            secureTextEntry={showNewPassword}
            onToggleVisibility={() => setShowNewPassword((prev) => !prev)}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          />
          <FloatingLabelInput
            ref={confirmPasswordRef}
            label="Confirmar Nova Senha"
            value={form.confirmPassword}
            onChangeText={(v) => handleChange('confirmPassword', v)}
            onBlur={() => handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            editable={!loading}
            isPasswordInput={true}
            secureTextEntry={showConfirmPassword}
            onToggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
            returnKeyType="done"
            onSubmitEditing={!disabledButton ? handleChangePassword : undefined}
          />
          <ButtonWrapper>
            <Button
              title="Alterar Senha"
              onPress={handleChangePassword}
              disabled={disabledButton || loading}
              loading={loading}
            />
          </ButtonWrapper>
        </FormSection>
      </ContentContainer>
    </Container>
  );
};

export default ChangePasswordScreen;
