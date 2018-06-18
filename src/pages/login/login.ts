import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {CreationProfilePage} from "../creationProfile/creationProfile";
import {AuthProvider} from "../../providers/auth/auth";
import {ProfilePage} from "../profile/profile";

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

  email = "";
  password = "";
  errorMessages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
    this.auth.isAuthenticated().then((authenticated) => {
      if (authenticated) {
        if(this.auth.newUser) {
          this.navCtrl.setRoot(ProfilePage);
        } else {
          this.navCtrl.setRoot(HomePage);
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  logIn() {
    this.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      this.errorMessages = [];
      this.errorMessages.push(String(error.message));
    });
  }

  logInWithGoogle() {
    this.auth.googleLogin().then(() => {
      if(this.auth.newUser) {
        this.navCtrl.setRoot(ProfilePage);
      } else {
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

  inscription() {
    this.navCtrl.push(CreationProfilePage);
  }
}
