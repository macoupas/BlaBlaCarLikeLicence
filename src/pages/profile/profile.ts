import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user.model";
import {FirestoreStorageProvider} from "../../providers/firestore-storage/firestore-storage";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

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
    comments: [],
    journeys: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthProvider,
              private fs: FirestoreStorageProvider) {
  }

  ionViewDidLoad() {
    console.debug('profileUser', this.user);
    console.debug('userAuth', this.auth.userConnected);
    Object.assign(this.user, this.auth.userConnected);
  }

  setParamsCompte() {

  }

  creerCompte() {
    this.fs.addUser(this.user).then(() => {
      console.debug('Profile created with success');
      this.auth.newUser = false;
    }). catch((error) => {
      console.error('Creation failed : ', error);
    })
  }
}
