import Constants from 'expo-constants';

const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
const API_KEY = Constants.expoConfig.extra.oneSignalApiKey;

export const cancelNotification = async (notificationId) => {
  try {
    const response = await fetch(
      `https://api.onesignal.com/notifications/${notificationId}?app_id=${APP_ID}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${API_KEY}`,
        },
      }
    );

    const result = await response.json();
    if (result.errors) {
      console.warn('Cancel error:', result.errors);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Cancel notification error:', error);
    return false;
  }
};
