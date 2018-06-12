import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navigateCtrl: NavController, public navParams: NavParams) {
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoituresPage');
  }
  
  

}
