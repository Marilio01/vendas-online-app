import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container, Logo, Title, Subtitle, ButtonContainer } from '../styles/firstScreen.style';
import Button from '../../../shared/components/button/Button';

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
      <Title>O seu novo jeito de comprar</Title>
      <Subtitle>Fácil, rápido e na palma da mão.</Subtitle>
      <ButtonContainer>
        <Button title="Entrar" onPress={handleGoToLogin} variant="primary" withShadow={true} />
        <Button title="Cadastre-se" onPress={handleGoToCreateUser} variant="secondary" />
      </ButtonContainer>
    </Container>
  );
};

export default FirstScreen;
