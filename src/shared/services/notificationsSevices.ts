import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';

export async function displayLocalNotification(title: string, body: string) {
  try {

    const settings = await notifee.getNotificationSettings();

    if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
      console.log('Notificação não enviada: permissão não autorizada.');
      return;
    }

    const channelId = await notifee.createChannel({
      id: 'default', 
      name: 'Default Channel', 
      importance: AndroidImportance.HIGH, 
    });

    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId, 
        pressAction: {
          id: 'default', 
        },
      },
    });
  } catch (error) {
    console.error('Erro ao exibir notificação:', error);
  }
}