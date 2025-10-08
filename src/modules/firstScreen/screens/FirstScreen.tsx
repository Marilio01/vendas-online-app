import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Container,
  Logo,
  Title,
  Subtitle,
  ButtonContainer,
  PrimaryButton,
  ButtonTextPrimary,
  SecondaryButton,
  ButtonTextSecondary,
} from '../styles/firstScreen.style';

type AuthStackParamList = {
  Login: undefined;
  CreateUser: undefined;
};

const FirstScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoToCreateUser = () => {
    navigation.navigate('CreateUser');
  };

  return (
    <Container>
      <Logo source={require('../../../assets/images/logo.jpg')} />
      <Title>Encontre o que procura</Title>
      <Subtitle>A sua experiência de compra, simplificada.</Subtitle>
      <ButtonContainer>
        <PrimaryButton onPress={handleGoToLogin}>
          <ButtonTextPrimary>Entrar</ButtonTextPrimary>
        </PrimaryButton>
        <SecondaryButton onPress={handleGoToCreateUser}>
          <ButtonTextSecondary>Cadastra-se</ButtonTextSecondary>
        </SecondaryButton>
      </ButtonContainer>
    </Container>
  );
};

export default FirstScreen;
