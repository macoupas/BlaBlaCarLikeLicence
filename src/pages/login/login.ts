import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  logIn(){
    this.navCtrl.setRoot(HomePage)
}
}
