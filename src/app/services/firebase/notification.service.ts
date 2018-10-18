import { Injectable } from '@angular/core';
import { messaging } from 'firebase';
import { config } from '../../../environments/database';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  default = messaging();
  token = '';

  constructor() {
  }

  initialize() {
    this.default.requestPermission()
      .then(() => {

        this.default.getToken()
          .then(token => this.token = token)
          .then(() => {
            fetch('https://fcm.googleapis.com/fcm/send', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization':
                  'key=AAAACjXIRWo:APA91bEw67dw_16U78GVVDJ-T9bVpfCM5IgQi7UF5VjyoGrGvYS6pbW3IdhDndsWmwSku--4Ra7qHIsZmvIMtddRqNTpBY-TOSHCjYnmqd-ScVl8EHq5lNHZf_XvuO0eu_WaLkpBNkjchudGAQZJAoxz9qHU5gHsxQ'
              },
              method: 'POST',
              body: JSON.stringify({
                data: {
                  message: 'This is a Firebase Cloud Messaging Topic Message!'
                },
                to: this.token
              })
            });
          });
      })
      .catch(() => console.log('Disallow'));

    this.default.onMessage(function(payload) {
      console.log('Message received. ', payload);
      // const notification = new Notification(payload.data.message);
    });

    this.default.onTokenRefresh(() => {
      console.log('Token refreshed');

      this.default.getToken()
        .then(token => this.token = token);
    });
  }
}
