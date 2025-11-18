import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './Navigation';
import store from './store';
import GlobalModal from './shared/components/modal/globalModal/GlobalModal';
import { theme } from './shared/themes/theme';
import Toast from 'react-native-toast-message';
import { toastConfig } from './shared/components/customToast/ToastConfig';
import { CheckoutProvider } from './modules/checkout/context/CheckoutContext';

import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const currentSettings = await notifee.getNotificationSettings();

        if (currentSettings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
          await AsyncStorage.removeItem('notificationDeniedCount');
          return;
        }

        const deniedCount = await AsyncStorage.getItem('notificationDeniedCount');
        const currentCount = deniedCount ? parseInt(deniedCount, 10) : 0;

        if (currentCount >= 2) {
          Alert.alert(
            'Permissão de Notificação Necessária',
            'Para receber alertas importantes sobre seus pedidos e promoções, habilite as notificações nas configurações.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Ir para Configurações', onPress: () => Linking.openSettings() },
            ],
          );
          return;
        }

        const settings = await notifee.requestPermission();

        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
          await AsyncStorage.removeItem('notificationDeniedCount');
        } else {
          await AsyncStorage.setItem('notificationDeniedCount', (currentCount + 1).toString());
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
      }
    };

    const requestLocationPermission = async () => {
      try {
        let granted = true;

        if (Platform.OS === 'android') {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permissão de Localização',
              message:
                'Precisamos da sua localização para facilitar a entrega e mostrar seu endereço no mapa.',
              buttonPositive: 'OK',
            },
          );

          granted = result === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const result = await Geolocation.requestAuthorization('whenInUse');
          granted = result === 'granted';
        }

        if (!granted) {
          const deniedCount = await AsyncStorage.getItem('locationDeniedCount');
          const currentCount = deniedCount ? parseInt(deniedCount, 10) : 0;

          if (currentCount >= 2) {
            Alert.alert(
              'Permissão Necessária',
              'Para detectar sua localização automaticamente, habilite a permissão nas configurações.',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Ir para Configurações', onPress: () => Linking.openSettings() },
              ],
            );
          } else {
            await AsyncStorage.setItem('locationDeniedCount', (currentCount + 1).toString());
          }
        } else {
          await AsyncStorage.removeItem('locationDeniedCount');
          console.log('📍 Localização PERMITIDA!');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de localização:', error);
      }
    };

    const init = async () => {
      await requestNotificationPermission();
      await requestLocationPermission();
    };

    init();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <CheckoutProvider>
          <SafeAreaProvider>
            <ThemeProvider theme={theme}>
              <Navigation />
              <GlobalModal />
            </ThemeProvider>
          </SafeAreaProvider>
        </CheckoutProvider>
      </Provider>
      <Toast config={toastConfig} position="bottom" />
    </GestureHandlerRootView>
  );
};

export default App;
