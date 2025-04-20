import Constants from 'expo-constants';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
const API_KEY = Constants.expoConfig.extra.oneSignalApiKey;

console.log("APP_ID = " + APP_ID);
console.log("API_KEY = " + API_KEY);


export const sendNotification = async ({ id, title, description, date }) => {
  try {
    const externalId = await AsyncStorage.getItem('externalId');
    //const sendTime = moment(date).tz('Europe/Kiev', true).toDate()+3 * 60 * 60 * 1000;
    const sendTime = new Date(moment(date).tz('Europe/Kiev', true).toDate().getTime() + 3 * 60 * 60 * 1000);
    //const sendTime = new Date(date).toISOString();
console.log('Тип date:', typeof date);
console.log('Значення date:', date);


    console.log('Відправка сповіщення до OneSignal:', {
        app_id: APP_ID,
        externalId,
        title,
        description,
        sendTime: sendTime.toISOString(),
      });

    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${API_KEY}`,
      },
      body: JSON.stringify({
        app_id: APP_ID,
        target_channel: 'push',
        include_aliases: { external_id: [externalId] },
        headings: { en: title },
        contents: { en: description || 'Нагадування' },
        send_after: sendTime.toISOString(),
        data: { taskId: id },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error('OneSignal Error:', result.errors);
      return null;
    }
    console.log('Відповідь від OneSignal:', result);

    return result.id;
  } catch (error) {
    console.error('Send notification error:', error);
    return null;
  }
};
