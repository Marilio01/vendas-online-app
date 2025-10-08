import React, { useRef } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FloatingLabelInput } from '../../../shared/components/floatingLabelInput/FloatingLabelInput';
import Text from '../../../shared/components/text/Text';
import { useCreateUser } from '../hooks/useCreateUser';
import {
  ContainerCreateUser,
  Imagelogo,
  Title,
  BottomLinkContainer,
  BottomText,
  BottomLink,
  PrimaryButton,
  ButtonContainer,
} from '../styles/createUser.style';
import { theme } from '../../../shared/themes/theme';

const CreateUser = () => {
  const {
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
  } = useCreateUser();

  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const isButtonDisabled = !isFormValid || loading;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutralTheme.black }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ContainerCreateUser>
            <Imagelogo resizeMode="contain" source={require('../../../assets/images/logo.jpg')} />
            <Title>Crie sua conta</Title>

            <FloatingLabelInput
              label="Nome"
              value={values.name}
              onChangeText={(text) => handleChange('name', text)}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              returnKeyType="next"
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
            <FloatingLabelInput
              ref={phoneRef}
              label="Telefone"
              type="cel-phone"
              value={values.phone}
              maxLength={15}
              onChangeText={(text) => handleChange('phone', text)}
              onBlur={() => handleBlur('phone')}
              error={errors.phone}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <FloatingLabelInput
              ref={emailRef}
              label="E-mail"
              value={values.email}
              onChangeText={(text) => handleChange('email', text)}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => cpfRef.current?.focus()}
            />
            <FloatingLabelInput
              ref={cpfRef}
              label="CPF"
              type="cpf"
              value={values.cpf}
              maxLength={14}
              onChangeText={(text) => handleChange('cpf', text)}
              onBlur={() => handleBlur('cpf')}
              error={errors.cpf}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <FloatingLabelInput
              ref={passwordRef}
              label="Senha"
              value={values.password}
              onChangeText={(text) => handleChange('password', text)}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              isPasswordInput={true}
              secureTextEntry={showPassword}
              onToggleVisibility={() => setShowPassword((prev) => !prev)}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <FloatingLabelInput
              ref={confirmPasswordRef}
              label="Confirme a Senha"
              value={values.confirmPassword}
              onChangeText={(text) => handleChange('confirmPassword', text)}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              isPasswordInput={true}
              secureTextEntry={showConfirmPassword}
              onToggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
              returnKeyType="done"
              onSubmitEditing={!isButtonDisabled ? handleCreateUser : undefined}
            />

            <ButtonContainer>
              <PrimaryButton onPress={handleCreateUser} disabled={isButtonDisabled}>
                {loading ? (
                  <ActivityIndicator color = {theme.colors.neutralTheme.white} />
                ) : (
                  <Text style={{ color: theme.colors.neutralTheme.white, fontWeight: 'bold' }}>Cadastrar</Text>
                )}
              </PrimaryButton>
            </ButtonContainer>

            <BottomLinkContainer>
              <BottomText>Já tem uma conta?</BottomText>
              <TouchableOpacity onPress={handleGoToLogin}>
                <BottomLink>Entre</BottomLink>
              </TouchableOpacity>
            </BottomLinkContainer>
          </ContainerCreateUser>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateUser;