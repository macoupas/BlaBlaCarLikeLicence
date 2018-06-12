import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Utilisateur} from "../../models/utilisateur.model";
import {FirestoreStorageProvider} from "../../providers/firestore-storage/firestore-storage";

/**
 * Generated class for the ComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html',
})
export class ComptePage {

  private utilisateur: Utilisateur = {
    uid: "",
    username: "",
    photoUrl: "",
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
    age: 0,
    voitures: [],
    commentaires: [],
    trajets: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fs: FirestoreStorageProvider) {

  }

  ionViewDidLoad() {
    console.debug('compteUser', this.utilisateur);
  }

  setParamsCompte() {

  }

  creerCompte() {
    this.fs.addUtilisateur(this.utilisateur).then(() => {
      console.debug('Compte créé avec succes');
    }). catch((error) => {
      console.error('Echec de la création : ', error);
    })
  }
}
