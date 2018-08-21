import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SignModule } from './sign/sign.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    SignModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    const config = {
      apiKey: 'AIzaSyA2XW3sd7BVLBhW1QK9inYRoqfVTNNm9Vw',
      authDomain: 'todo-list-1909.firebaseapp.com',
      databaseURL: 'https://todo-list-1909.firebaseio.com',
      projectId: 'todo-list-1909',
      storageBucket: 'todo-list-1909.appspot.com',
      messagingSenderId: '43851990378'
    };
    firebase.initializeApp(config);
  }
}
