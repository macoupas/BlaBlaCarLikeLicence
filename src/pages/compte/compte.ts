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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComptePage');
  }

  setParamsCompte() {
  }
}
