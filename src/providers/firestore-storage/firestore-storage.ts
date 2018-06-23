import { Injectable } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {USER_PATH, User} from "../../models/user.model";
import {Journey, JOURNEY_PATH} from "../../models/journey.model";
import {Filter} from "../../models/filter.model";
import * as firebase from "firebase";

/*
  Generated class for the FirestoreStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreStorageProvider {

  private db;

  constructor(private afs: AngularFirestore) {
    this.db = firebase.firestore();
  }

  createId() {
    return this.afs.createId();
  }

  getUser(userId: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(USER_PATH).doc(userId).get().then(result => {
        let user = result.data();
        if (user != undefined) {
          resolve(user);
        } else {
          resolve(null);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addUser(user: User) {
    return this.db.collection(USER_PATH).doc(user.uid).set(user);
  }

  addJourney(journey: Journey) {
    console.debug('Journey for adding', journey);
    journey.price = Number(journey.price);
    journey.placesCar = Number(journey.placesCar);
    journey.remainingPlacesCar = Number(journey.remainingPlacesCar);
    return this.db.collection(JOURNEY_PATH).doc(journey.uid).set(journey);
  }

  getJourneysWithFilters(filters: Array<Filter>) {
    let journeyRef = this.db.collection(JOURNEY_PATH);
    let queryJourney = journeyRef.where(filters[0].field, filters[0].operator, filters[0].value);
    filters.forEach(filter => {

    });
  }
}
