import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilPage} from "../profil/profil";
import {FirestoreStorageProvider} from "../../providers/firestore-storage/firestore-storage";
import {User, USER_JOURNEY_PATH, USER_PASSENGER_PATH, USER_PATH} from "../../models/user.model";
import {AuthProvider} from "../../providers/auth/auth";
import * as firebase from "firebase";
import {JOURNEY_PATH} from "../../models/journey.model";
import {MyJourneysPage} from "../my-journeys/my-journeys";


/**
 * Generated class for the JourneyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journey-detail',
  templateUrl: 'journey-detail.html',
})
export class JourneyDetailPage {

  journey;
  passengers: Array<User> = [];

  bookPossible = true;
  unbookPossible = false;

  deletePossible = false;

  date : string;

  isStartPlaceDetailShown: Boolean = false;
  isEndPlaceDetailShown: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fs: FirestoreStorageProvider,
              private auth: AuthProvider) {
    this.journey = this.navParams.data.journey;

    if(this.journey.passengers) {
      this.journey.passengers.forEach((passenger) => {
        passenger.get().then((userSnapshot) => {
          let user = userSnapshot.data();
          this.passengers.push(user);
          if (user.uid == this.auth.userConnected.uid) {
            this.unbookPossible = true;
            this.bookPossible = false;
          }
        })
      });
    }

    console.debug('journey', this.journey);
    console.debug('passenger', this.passengers);

    if(this.journey.driver.uid == this.auth.userConnected.uid) {
      this.bookPossible = false;
      this.deletePossible = true;
      this.unbookPossible = false;
    }
  }

  ionViewDidLoad() {
    console.debug('ok');
  }

  toogleStartPlace() {
    this.isStartPlaceDetailShown = !this.isStartPlaceDetailShown;
  }

  toogleEndPlace() {
    this.isEndPlaceDetailShown = !this.isEndPlaceDetailShown;
  }

  goToDriverDetail() {
    this.navCtrl.push(ProfilPage, {user: this.journey.driver})
  }

  goToPassengerDetail(passenger) {
      this.navCtrl.push(ProfilPage, {user: passenger});

  }

  book() {
    if(this.journey.driver.uid == this.auth.userConnected.uid) {
      console.error('You can\'t book this project because you are the driver');
      return;
    }
    if(this.passengers.indexOf(this.auth.userConnected) >=0 ) {
      console.error('Already passenger');
      return;
    }
    this.journey.passengers.push(this.fs.getDocumentReference(USER_PATH, this.auth.userConnected.uid));
    this.journey.remainingPlacesCar--;
    this.fs.addPassengerJourney(this.journey.uid, this.journey.passengers, this.journey.remainingPlacesCar);
    this.fs.addSecondDocument(USER_PATH, this.auth.userConnected.uid, USER_PASSENGER_PATH,
      this.journey.uid, {ref: this.fs.getDocumentReference(JOURNEY_PATH, this.journey.uid)});
    this.passengers.push(this.auth.userConnected);
  }

  unbook() {
      let passengerRef = this.fs.getDocumentReference(USER_PATH, this.auth.userConnected.uid);

      this.passengers.slice(this.passengers.indexOf(this.auth.userConnected),1);
      this.journey.passengers.slice(this.journey.passengers.indexOf(passengerRef), 1);
      this.journey.remainingPlacesCar++;

      this.fs.addPassengerJourney(this.journey.uid, this.journey.passengers, this.journey.remainingPlacesCar);
      this.fs.deleteSecondDocument(USER_PATH, this.auth.userConnected.uid, USER_PASSENGER_PATH,
        this.journey.uid).then(result => {
          this.bookPossible = true;
          this.unbookPossible = false;
      })
  }

  deleteJourney() {
    if(this.journey.driver.uid == this.auth.userConnected.uid) {
      let users = [];
      this.journey.passengers.forEach(userRef => {
        userRef.get(userSnapshot => {
          let user = userSnapshot.data();
          this.fs.deleteSecondDocument(USER_PATH, user.uid, USER_PASSENGER_PATH, this.journey.uid).then(result => {
            console.log(user.username + ' automatically unbook to this journey');
          }).catch(error => {
            console.error('Delete failed : ' + error);
          })
        })
      });
      this.fs.deleteSecondDocument(USER_PATH, this.auth.userConnected.uid, USER_JOURNEY_PATH, this.journey.uid).then(result => {
        console.log('Reference of journey deleted in user');
      }).catch(error => {
        console.error('Delete failed' + error);
      })
      this.fs.deleteDocument(JOURNEY_PATH, this.journey.uid).then(result => {
        this.navCtrl.setRoot(MyJourneysPage);
      })
    } else {
      console.error('You are not the driver. You can\'t delete this journey');
    }
  }
}
