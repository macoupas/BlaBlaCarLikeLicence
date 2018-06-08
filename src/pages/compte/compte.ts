import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";

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

  utilisateur: Utilisateur = {
    uid: "",
    nom: "",
    prenom: "",
    mail: "",
    telephone: "",
    age: "",
    voitures: "",
    commentaires: [],
    trajets: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:StorageProvider) {
    this.storage.getValue('user').then(user => {
      this.utilisateur.nom = user.nom;
      this.utilisateur.prenom = user.prenom;
      this.utilisateur.mail = user.mail;
      this.utilisateur.telephone = user.telephone;
      this.utilisateur.age = user.age;
      this.utilisateur.voitures = user.voitures;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComptePage');
  }

  setParamsCompte() {
    this.storage.setValue('user', {
      nom: this.utilisateur.nom,
      prenom: this.utilisateur.prenom,
      mail: this.utilisateur.mail,
      telephone: this.utilisateur.telephone,
      age: this.utilisateur.age,
      voitures: this.utilisateur.voitures
    });
  }
}
