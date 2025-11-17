import React, { useMemo, useState } from 'react';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import {
  Container,
  ContentWrapper,
  ProfileAvatarCircle,
  ProfileAvatarInitials,
  Section,
  SectionTitle,
  InfoRow,
  InfoText,
  Separator,
  LogoutRow,
  LogoutText,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalText,
  ModalButtonWrapper,
  InfoLeft,
  ProfileInfoCard,
  ProfileInfoLeft,
  ProfileName,
  ProfileEmail,
} from '../styles/profile.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { getInitials, getAvatarColor } from '../../../shared/utils/avatar';
import { Modal, View } from 'react-native';
import Button from '../../../shared/components/button/Button';
import { useAuth } from '../../../shared/hooks/useAuth';
import { theme } from '../../../shared/themes/theme';

const Profile = () => {
  const { user } = useUserReducer();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { handleLogout } = useAuth();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const openLogoutModal = () => setIsLogoutModalVisible(true);
  const closeLogoutModal = () => setIsLogoutModalVisible(false);

  const handleNavigateToEdit = () => {
    navigation.navigate('EditProfile');
  };
  const handleNavigateToOrder = () => {
    navigation.navigate('Orders');
  };
  const handleNavigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const initials = useMemo(() => getInitials(user?.name), [user?.name]);
  const avatarColor = useMemo(() => getAvatarColor(user?.name), [user?.name]);

  const iconColor = theme.colors.text.primary;
  const chevronColor = theme.colors.text.secondary;

  return (
    <Container>
      <ContentWrapper contentContainerStyle={{ paddingBottom: 30 }}>
        <ProfileInfoCard onPress={handleNavigateToEdit}>
          <ProfileInfoLeft>
            <ProfileAvatarCircle backgroundColor={avatarColor}>
              <ProfileAvatarInitials>{initials}</ProfileAvatarInitials>
            </ProfileAvatarCircle>
            <View>
              <ProfileName>{user?.name || 'Cliente'}</ProfileName>
              <ProfileEmail>{user?.email || 'email@exemplo.com'}</ProfileEmail>
            </View>
          </ProfileInfoLeft>
          <Icon name="chevron-right" size={24} color={chevronColor} />
        </ProfileInfoCard>

        <SectionTitle>MINHA CONTA</SectionTitle>
        <Section>
          <InfoRow onPress={handleNavigateToOrder}>
            <InfoLeft>
              <Icon name="shopping-bag" size={22} color={iconColor} />
              <InfoText>Meus Pedidos</InfoText>
            </InfoLeft>
            <Icon name="chevron-right" size={24} color={chevronColor} />
          </InfoRow>
          <Separator />
          <InfoRow onPress={handleNavigateToChangePassword}>
            <InfoLeft>
              <Icon name="lock" size={22} color={iconColor} />
              <InfoText>Alterar Senha</InfoText>
            </InfoLeft>
            <Icon name="chevron-right" size={24} color={chevronColor} />
          </InfoRow>
        </Section>

        <SectionTitle>OUTROS</SectionTitle>
        <Section>
          <LogoutRow onPress={openLogoutModal}>
            <InfoLeft>
              <Icon name="logout" size={22} color={theme.colors.semantic.error} />
              <LogoutText>Sair</LogoutText>
            </InfoLeft>
          </LogoutRow>
        </Section>
      </ContentWrapper>

      <Modal
        transparent
        visible={isLogoutModalVisible}
        animationType="fade"
        onRequestClose={closeLogoutModal}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>Confirmar Saída</ModalTitle>
            <ModalText>Você tem certeza que deseja sair da sua conta?</ModalText>
            <ModalButtonWrapper>
              <Button title="Cancelar" onPress={closeLogoutModal} variant="secondary" />
              <View style={{ height: 8 }} />
              <Button title="Sim, sair" onPress={handleLogout} variant="danger" />
            </ModalButtonWrapper>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

export default Profile;
