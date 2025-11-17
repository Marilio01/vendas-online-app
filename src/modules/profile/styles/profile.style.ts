import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
  padding-top: 20px;
`;

export const ContentWrapper = styled.ScrollView`
  flex-grow: 1;
  padding-horizontal: 20px;
`;

export const ProfileInfoCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.neutral.surface};
  border-radius: 14px;
  padding: 15px;
  margin-bottom: 25px;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 5px;
  elevation: 3;
`;

export const ProfileInfoLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfileAvatarCircle = styled.View<{ backgroundColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
  background-color: ${({ backgroundColor }: { backgroundColor: string }) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const ProfileAvatarInitials = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.neutral.surface};
`;

export const ProfileName = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const ProfileEmail = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  margin-top: 2px;
`;

export const SectionTitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  margin-bottom: 10px;
  margin-top: 10px;
  padding-horizontal: 5px;
  text-transform: uppercase;
`;

export const Section = styled.View`
  background-color: ${theme.colors.neutral.surface};
  border-radius: 14px;
  padding-horizontal: 15px;
  margin-bottom: 18px;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 5px;
  elevation: 3;
`;

export const InfoRow = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 16px;
`;

export const InfoLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  margin-left: 15px;
  color: ${theme.colors.text.primary};
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${theme.colors.neutral.border};
  width: 100%;
`;

export const LogoutRow = styled(InfoRow)``;

export const LogoutText = styled(InfoText)`
  color: ${theme.colors.semantic.error};
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 80%;
  background-color: ${theme.colors.neutral.surface};
  border-radius: 12px;
  padding: 24px;
  align-items: center;
`;

export const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${theme.colors.text.primary};
  text-align: center;
`;

export const ModalText = styled(Text)`
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
  color: ${theme.colors.text.secondary};
`;

export const ModalButtonWrapper = styled.View`
  width: 100%;
`;
