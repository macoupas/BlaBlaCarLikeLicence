import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import { Observable } from 'rxjs';
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {auth} from "firebase";
import {App, NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  utilisateur: Observable<Utilisateur>;

  private navCtrl: NavController;

  constructor(private afAuth: AngularFireAuth, private db:AngularFirestore, private app:App) {
    this.navCtrl = app.getActiveNav();
    this.utilisateur = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<Utilisateur>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.navCtrl.setRoot(HomePage);
        console.log(credential);
        this.updateUserData(credential.user)
      }).catch((error) => {
        console.error('La connexion a échoué', error.message);
      });
  }

  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.db.doc(`utilisateurs/${user.uid}`);

    const data: Utilisateur = {
      uid: user.uid,
      mail: user.email,
      nom: user.displayName,
      age: 0,
      prenom: user.displayName,
      telephone: "",
      voitures: [],
      commentaires: [],
      trajets: []
    };

    return userRef.set(data, { merge: true })

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
