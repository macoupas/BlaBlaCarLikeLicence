import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ComptePage} from "../pages/compte/compte";
import { StorageProvider } from '../providers/storage/storage';
import {IonicStorageModule} from "@ionic/storage";
import {CreationComptePage} from "../pages/creation-compte/creation-compte";
import { AngularFirestoreModule} from "angularfire2/firestore";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

export const firestoreConfig = {
  apiKey: "AIzaSyAkfcjbz2_uhX3dPY_k6lXysc25PY-z8YE",
  authDomain: "gestion-de-covoiturage.firebaseapp.com",
  databaseURL: "https://gestion-de-covoiturage.firebaseio.com",
  projectId: "gestion-de-covoiturage",
  storageBucket: "gestion-de-covoiturage.appspot.com",
  messagingSenderId: "692627907333"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
	  ComptePage,
    CreationComptePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'blablacarDb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireModule.initializeApp(firestoreConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
	  ComptePage,
    CreationComptePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    AuthProvider
  ]
})
export class AppModule {}
