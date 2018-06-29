import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VoituresPage } from '../voitures/voitures';
import {CommentairesPage } from '../commentaires/commentaires';
import {HistoriquePage } from '../historique/historique';
import {User} from "../../models/user.model";
import {Car} from "../../models/car.model";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams , private auth:AuthProvider) {
    this.user = this.navParams.data.user;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

    goToVoitures(){
     this.navCtrl.push(VoituresPage);
    }

    goToCommentaires(){
    this.navCtrl.push(CommentairesPage);
    }

    goToHistorique(){
    this.navCtrl.push(HistoriquePage);
    }
}
