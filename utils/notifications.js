import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATIONS_KEY = 'MobileFlashcards:notifications';

const createNotificationContent = () => ({
  title: "Mobile Flashcards",
  body: "Don't forget to quiz yourself today!",
  ios: {
    sound: true
  }
});

const createNotificationSchedule = () => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);

  return {
    repeat: 'day',
    time: tomorrow
  }
}

export const clearLocalNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              Notifications.scheduleLocalNotificationAsync(
                createNotificationContent(),
                createNotificationSchedule()
              );

              AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
            }
          });
      }
    });
};
