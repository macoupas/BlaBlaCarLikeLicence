import { Injectable } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {USER_PATH, User} from "../../models/user.model";
import {Journey, JOURNEY_PATH} from "../../models/journey.model";
import {Filter} from "../../models/filter.model";
import * as firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;

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

  getDocumentReference(collectionName: string, idDoc: string) : DocumentReference{
    return this.db.collection(collectionName).doc(idDoc);
  }

  getDocument(collectionName: string, idDoc: string) {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).doc(idDoc).get().then(result => {
        let doc = result.data();
        if (doc != undefined) {
          resolve(doc);
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

  getDocuments(collectionName: string, filters: Array<Filter>): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let query = this.db.collection(collectionName);
      filters.forEach(filter => query = query.where(filter.field, filter.operator, filter.value));
      query.get()
        .then((querySnapshot) => {
          let results = [];
          querySnapshot.forEach(function (doc) {
            results.push(doc.data());
          });
          if (results.length > 0) {
            resolve(results);
          } else {
            console.error("No document");
            resolve(null);
          }
        })
        .catch((error: any) => reject(error));
    });
  }
}
