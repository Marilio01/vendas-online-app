import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';
import { Alert, Linking } from 'react-native';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './Navigation';
import store from './store';
import GlobalModal from './shared/components/modal/globalModal/GlobalModal';
import { theme } from './shared/themes/theme';

const App = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        
        const deniedCount = await AsyncStorage.getItem('notificationDeniedCount');
        const currentCount = deniedCount ? parseInt(deniedCount) : 0;

        
        if (currentCount >= 2) {
          Alert.alert(
            'Permissão de Notificação Necessária',
            'Para receber alertas importantes sobre seus pedidos e promoções, por favor, habilite as notificações nas configurações.',
            [
              {
                text: 'Cancelar',
                onPress: () => console.log('Cancelado'),
                style: 'cancel',
              },
              {
                text: 'Ir para Configurações',
                onPress: () => {
                  
                  Linking.openSettings();
                },
              },
            ]
          );
          return;
        }

        const settings = await notifee.requestPermission();

        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
          console.log('Permissão de notificação concedida!');
          
          await AsyncStorage.removeItem('notificationDeniedCount');
        } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
          console.log('Permissão de notificação negada.');
          
          const newCount = currentCount + 1;
          await AsyncStorage.setItem('notificationDeniedCount', newCount.toString());
        } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
          console.log('Permissão provisória de notificação.');
          
          await AsyncStorage.removeItem('notificationDeniedCount');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
          <GlobalModal />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;