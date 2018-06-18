import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProfilePage} from "../pages/profile/profile";
import { StorageProvider } from '../providers/storage/storage';
import {IonicStorageModule} from "@ionic/storage";
import {CreationProfilePage} from "../pages/creationProfile/creationProfile";
import { AngularFirestoreModule} from "angularfire2/firestore";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import {FirestoreStorageProvider} from "../providers/firestore-storage/firestore-storage";
import { PlaceProvider } from '../providers/place/place';
import { ConnectionProvider } from '../providers/connection/connection';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';

export const firestoreConfig = {
  apiKey: "AIzaSyAkfcjbz2_uhX3dPY_k6lXysc25PY-z8YE",
  authDomain: "gestion-de-covoiturage.firebaseapp.com",
  databaseURL: "https://gestion-de-covoiturage.firebaseio.com",
  projectId: "gestion-de-covoiturage",
  storageBucket: "gestion-de-covoiturage.appspot.com",
  messagingSenderId: "692627907333"
};

export const placeConfig = {
  apiKey: "AIzaSyBMlJvrcL543uamEbaJ6mIXTA4WhB7YOqg"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
	  ProfilePage,
    CreationProfilePage
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
	  ProfilePage,
    CreationProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    AuthProvider,
    FirestoreStorageProvider,
    PlaceProvider,
    ConnectionProvider,
    GoogleMapsProvider
  ]
})
export class AppModule {}
