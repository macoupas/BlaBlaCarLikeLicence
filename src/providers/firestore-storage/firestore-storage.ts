import { Injectable } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {USER_PATH, User} from "../../models/user.model";

/*
  Generated class for the FirestoreStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreStorageProvider {

  constructor(private afs: AngularFirestore) {
  }

  getUser(userId: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection(USER_PATH).doc(userId).ref.get().then(result => {
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
    return this.afs.collection(USER_PATH).doc(user.uid).set(user);
  }

}
