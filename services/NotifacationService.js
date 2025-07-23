import PushNotification from "react-native-push-notification";

class NotificationService {
  constructor() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
      },
      
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: "log-alerts", // unique id
        channelName: "Log Alert Notifications",
        importance: 4,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }

  sendNotification(title, message) {
    PushNotification.localNotification({
      channelId: "log-alerts",
      title: title,
      message: message,
      playSound: true,
      soundName: "default",
      importance: "high",
      vibrate: true,
    });
  }
}

export default new NotificationService();
