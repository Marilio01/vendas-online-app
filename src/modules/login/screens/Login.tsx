import React, { useRef } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { FloatingLabelInput } from '../../../shared/components/floatingLabelInput/FloatingLabelInput';
import { useLogin } from '../hooks/useLogin';
import {
  ContainerLogin,
  Imagelogo,
  Title,
  SignUpContainer,
  SignUpText,
  SignUpLink,
  PrimaryButton,
  ButtonContainer,
} from '../styles/login.style';
import Text from '../../../shared/components/text/Text';
import { theme } from '../../../shared/themes/theme';

const Login = () => {
  const {
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
  } = useLogin();

  const passwordInputRef = useRef<TextInput>(null);

  const isButtonDisabled = !isFormValid || loading;

  const handleEmailSubmit = () => {
    passwordInputRef.current?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.colors.neutralTheme.black }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <ContainerLogin>
          <Imagelogo resizeMode="contain" source={require('../../../assets/images/logo.jpg')} />
          <Title>Acesse sua conta</Title>

          <FloatingLabelInput
            label="E-mail"
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
            onBlur={() => handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={handleEmailSubmit}
          />
          <FloatingLabelInput
            ref={passwordInputRef}
            label="Senha"
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
            onBlur={() => handleBlur('password')}
            isPasswordInput={true}
            secureTextEntry={!showPassword}
            onToggleVisibility={handleToggleShowPassword}
            returnKeyType="done"
            onSubmitEditing={!isButtonDisabled ? handleOnPress : undefined}
          />

          <ButtonContainer>
            <PrimaryButton onPress={handleOnPress} disabled={isButtonDisabled}>
              {loading ? (
                <ActivityIndicator color={theme.colors.neutralTheme.white} />
              ) : (
                <Text style={{ color: theme.colors.neutralTheme.white, fontWeight: 'bold' }}>Entrar</Text>
              )}
            </PrimaryButton>
          </ButtonContainer>

          <SignUpContainer>
            <SignUpText>Não tem conta?</SignUpText>
            <TouchableOpacity onPress={handleGoToCreateUser}>
              <SignUpLink>Cadastre-se</SignUpLink>
            </TouchableOpacity>
          </SignUpContainer>
        </ContainerLogin>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;