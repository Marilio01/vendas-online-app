import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding-top: 20px;
  justify-content: space-between;
`;

export const ContentWrapper = styled.ScrollView`
  flex-grow: 1;
`;

export const ProfileHeader = styled.View`
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
  padding-horizontal: 20px;
`;

export const ProfileImage = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  margin-bottom: 10px;
`;

export const GreetingText = styled.Text`
  font-size: 22px;
  font-weight: 600;
`;

export const Section = styled.View`
  padding-horizontal: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const InfoRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  margin-left: 15px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #ddd;
  width: 90%;
  align-self: center;
  margin-vertical: 15px;
`;

export const Footer = styled.View`
  padding: 20px;
  padding-top: 0;
`;
