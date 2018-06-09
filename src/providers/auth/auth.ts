import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import { Observable } from 'rxjs';
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {auth, default as firebase, User} from "firebase";
import {App, NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";
import {FirestoreStorageProvider} from "../firestore-storage/firestore-storage";
import {ComptePage} from "../../pages/compte/compte";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  utilisateur: firebase.User;

  private navCtrl: NavController;

  constructor(private afAuth: AngularFireAuth, private fs: FirestoreStorageProvider, private app:App) {
    this.afAuth.authState.subscribe(user => {
      this.navCtrl = app.getActiveNav();
      if(user != null) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.fs.getUtilisateur(credential.user.uid).then((utilisateur) => {
          console.log(utilisateur);
          if(utilisateur == null) {
            console.log('null');
            this.navCtrl.setRoot(ComptePage);
          } else {
            console.log('non null');
            this.navCtrl.setRoot(HomePage);
          }
        });
      }).catch((error) => {
        console.error('La connexion a échoué', error.message);
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
