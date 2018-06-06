import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import {UtilisateurModel} from "../../models/utilisateur.model";

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

  utilisateur: UtilisateurModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:StorageProvider) {
    this.utilisateur = new UtilisateurModel(
      "",
      "",
      "",
      "",
      0,
      [],
      "",
      this.storage,
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComptePage');
    this.utilisateur.get();
  }

  setParamsCompte() {
    this.utilisateur.save();
  }
}
