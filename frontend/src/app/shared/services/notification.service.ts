import { Injectable } from '@angular/core';

import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

import { Notification } from 'src/app/shared/interfaces/notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  socket: Socket;
  currentNotifications: Notification[] = [];
  unreadNotifications: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.socket = io(environment.API_URL);
  }

  newNotification(notification: Notification) {
    this.currentNotifications.push(notification);
    this.unreadNotifications.next(this.unreadNotifications.value + 1);
  }

  readNotifications() {
    this.unreadNotifications.next(0);
  }

  emptyNotifications() {
    this.currentNotifications = [];
    this.unreadNotifications.next(0);
  }
}
