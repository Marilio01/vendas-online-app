import { Image } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../shared/themes/theme';
import * as S from '../styles/payment.style';
import { useCheckoutContext } from '../../checkout/context/CheckoutContext';
import { PaymentType } from '../hooks/usePayment';

const PaymentListScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { selectedPaymentMethod, setSelectedPaymentMethod } = useCheckoutContext();

  const paymentOptions = [
    { id: 'credit_card', title: 'Cartão de Crédito', icon: 'card-outline' },
    { id: 'pix', title: 'PIX', icon: 'pix' },
  ];

  const handleSelectPayment = (paymentMethod: PaymentType) => {
    setSelectedPaymentMethod(paymentMethod);
    navigation.goBack();
  };

  return (
    <S.Container style={{ paddingTop: 16 }}>
      <S.Card>
        {paymentOptions.map((item) => {
          const isSelected = selectedPaymentMethod === item.id;
          const iconColor = isSelected ? theme.colors.primary.main : theme.colors.text.secondary;

          return (
            <S.PaymentOption
              key={item.id}
              isSelected={isSelected}
              onPress={() => handleSelectPayment(item.id as PaymentType)}
              activeOpacity={0.8}
            >
              <S.PaymentLeft>
                {item.id === 'pix' ? (
                  <Image
                    source={require('../../../assets/images/pix-logo.png')}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: iconColor,
                    }}
                    resizeMode="contain"
                  />
                ) : item.id === 'credit_card' ? (
                  <Ionicons name="card-outline" size={24} color={iconColor} />
                ) : (
                  <Feather name={item.icon} size={24} color={iconColor} />
                )}
                <S.PaymentText isSelected={isSelected}>{item.title}</S.PaymentText>
              </S.PaymentLeft>
              {isSelected && <Feather name="check" size={20} color={theme.colors.primary.main} />}
            </S.PaymentOption>
          );
        })}
      </S.Card>
    </S.Container>
  );
};

export default PaymentListScreen;
