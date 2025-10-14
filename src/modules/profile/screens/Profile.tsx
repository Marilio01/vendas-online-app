import React from 'react';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import {
  Container,
  ContentWrapper,
  ProfileHeader,
  ProfileImage,
  GreetingText,
  Section,
  SectionTitle,
  InfoRow,
  InfoText,
  Separator,
  Footer,
} from '../styles/profile.style';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { logout } from '../../../shared/functions/connection/auth';
import Button from '../../../shared/components/button/Button';

const Profile = () => {
  const { user } = useUserReducer();
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  const handleLogout = () => logout(navigate);

  return (
    <Container>
      <ContentWrapper>
        <ProfileHeader>
          <ProfileImage source={require('../../../assets/images/profile.jpg')} />
          <GreetingText>Olá, {user?.name || 'Cliente'}</GreetingText>
        </ProfileHeader>

        <Section>
          <InfoRow>
            <Icon name="mail" size={24} color="#333" />
            <InfoText>{user?.email || 'email@exemplo.com'}</InfoText>
          </InfoRow>
          <InfoRow>
            <Icon name="edit" size={24} color="#333" />
            <InfoText>Editar Perfil</InfoText>
          </InfoRow>
        </Section>

        <Separator />

        <Section>
          <SectionTitle>Minhas Compras</SectionTitle>
          <InfoRow>
            <Icon name="shopping-bag" size={24} color="#333" />
            <InfoText>Meus Pedidos</InfoText>
          </InfoRow>
        </Section>

        <Separator />

        <Section>
          <SectionTitle>Configurações</SectionTitle>
          <InfoRow>
            <Icon name="lock" size={24} color="#333" />
            <InfoText>Alterar senha</InfoText>
          </InfoRow>
        </Section>
      </ContentWrapper>

      <Footer>
        <Button
          title="Sair"
          onPress={handleLogout}
          variant="danger"
          borderRadius="8px"
        />
      </Footer>

    </Container>
  );
};

export default Profile;
