
import notifee, { AndroidImportance } from '@notifee/react-native';

/**
   @param title 
   @param body 
 */
export async function displayLocalNotification(title: string, body: string) {
  try {
    await notifee.requestPermission();

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