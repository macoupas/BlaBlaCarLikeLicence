import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user.model";
import {AuthProvider} from "../../providers/auth/auth";
/**
 * Generated class for the VoituresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-voitures',
  templateUrl: 'voitures.html',
})
export class VoituresPage {

private user: User = {
    uid: "",
    username: "",
    photoUrl: "",
    name: "",
    firstName: "",
    mail: "",
    phone: "",
    age: 0,
    cars: [],
    comments: []
  };

  items: Array<{model: string, mark: string, color: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthProvider) {
    this.navCtrl = navCtrl;
    this.user = this.auth.userConnected;
    this.items = [];
    for (let i = 1; i < this.user.cars.length; i++) {
        this.items.push({
        model: this.user.cars[i].model,
        mark:  this.user.cars[i].mark,
        color: this.user.cars[i].color
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoituresPage');
  }



}
