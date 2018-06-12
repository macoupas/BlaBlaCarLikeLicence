import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase';
import {AngularFirestore} from "angularfire2/firestore";
import {USER_PATH, Utilisateur} from "../../models/utilisateur.model";

/*
  Generated class for the FirestoreStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreStorageProvider {

  constructor(private afs: AngularFirestore) {
  }

  getUtilisateur(utilisateurId: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection(USER_PATH).doc(utilisateurId).ref.get().then(result => {
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

  addUtilisateur(utilisateur: Utilisateur) {
    return this.afs.collection(USER_PATH).doc(utilisateur.uid).set(utilisateur);
  }

}
