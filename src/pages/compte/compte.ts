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

  nom: String;
  prenom: String;
  mail: String;
  telephone: String;
  age: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:StorageProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComptePage');
    this.storage.getValue('nom').then(nom => this.nom = nom);
    this.storage.getValue('prenom').then(prenom => this.prenom = prenom);
    this.storage.getValue('mail').then(mail => this.mail = mail);
    this.storage.getValue('telephone').then(telephone => this.telephone = telephone);
    this.storage.getValue('age').then(age => this.age = age);
  }

  setParamsCompte() {
    this.storage.setValue('nom', this.nom);
    this.storage.setValue('prenom', this.prenom);
    this.storage.setValue('mail', this.mail);
    this.storage.setValue('telephone', this.telephone);
    this.storage.setValue('age', this.age);
  }
}
