import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import { SafeAreaView, FlatList, FlatListProps, View } from 'react-native';
import { AddressType } from '../../../shared/types/AddressType';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.neutral.background};
`;

export const AddressList = styled(
  FlatList as new (props: FlatListProps<AddressType>) => FlatList<AddressType>,
).attrs({
  contentContainerStyle: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: ${theme.colors.neutral.surface};
  border-top-width: 1px;
  border-top-color: ${theme.colors.neutral.border};
`;

export const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-top: 16px;
`;

export const AddressItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${theme.colors.neutral.surface};
  border: 1px solid ${theme.colors.neutral.border};
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const SelectedAddressItem = styled(AddressItemContainer)`
  border-color: ${theme.colors.primary.main};
  border-width: 2px;
`;

export const AddressContent = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const AddressText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const AddressTextSecondary = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  background-color: ${theme.colors.neutral.surface};
  border-radius: 8px;
  padding: 24px;
  width: 80%;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const ModalText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 24px;
`;
