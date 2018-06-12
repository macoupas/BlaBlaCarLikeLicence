import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VoituresPage } from '../voitures/voitures';
import {CommentairesPage } from '../commentaires/commentaires';
import {HistoriquePage } from '../historique/historique';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
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
