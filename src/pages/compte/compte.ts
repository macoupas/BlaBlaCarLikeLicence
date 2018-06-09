import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Utilisateur} from "../../models/utilisateur.model";

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

  private utilisateurConnectee: Utilisateur = {
    uid: "",
    username: "",
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
    age: 0,
    voitures: [],
    commentaires: [],
    trajets: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthProvider) {

  }

  ionViewDidLoad() {
    this.utilisateurConnectee = this.auth.utilisateurConnectee;
    console.debug('compteUser', this.utilisateurConnectee);
  }

  setParamsCompte() {
  }
}
