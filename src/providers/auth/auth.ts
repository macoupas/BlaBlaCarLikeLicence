import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {auth} from "firebase";
import {App, NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";
import {FirestoreStorageProvider} from "../firestore-storage/firestore-storage";
import {ProfilePage} from "../../pages/profile/profile";
import {User} from "../../models/user.model";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  userConnected: User;

  private navCtrl: NavController;

  constructor(private afAuth: AngularFireAuth, private fs: FirestoreStorageProvider, private app: App) {
    this.afAuth.authState.subscribe(user => {
      this.navCtrl = app.getActiveNav();
      if (user != null) {
        console.debug('user', user);
        this.fs.getUser(user.uid).then((userInDB) => {
          if (userInDB == null) {
            this.userConnected = {
              uid: user.uid,
              username: user.displayName,
              photoUrl: user.photoURL,
              name: "",
              firstName: "",
              mail: user.email,
              phone: user.phoneNumber ? user.phoneNumber : "",
              age: null,
              cars: [],
              comments: [],
              journeys: []
            };
            console.log('userConnected', this.userConnected);
            this.navCtrl.setRoot(ProfilePage);
          } else {
            console.log('user', userInDB);
            let userConnected = JSON.parse(JSON.stringify(userInDB));
            this.userConnected = {
              uid: userConnected.uid,
              username: userConnected.username,
              photoUrl: userConnected.photoUrl,
              name: userConnected.name,
              firstName: userConnected.firstName,
              mail: userConnected.mail,
              phone: userConnected.phone,
              age: userConnected.age,
              cars: userConnected.cars,
              comments: userConnected.comments,
              journeys: userConnected.journeys
            };
            console.log('userConnected', this.userConnected);
            this.navCtrl.setRoot(HomePage);
          }
        });
      }
    });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.fs.getUser(credential.user.uid).then((user) => {
          console.log(user);
          if (user == null) {
            console.log('null');
            this.navCtrl.setRoot(ProfilePage);
          } else {
            console.log('not null');
            this.navCtrl.setRoot(HomePage);
          }
        });
      }).catch((error) => {
        console.error('The connexion failed', error.message);
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    }).catch((error) => {
      console.error('SignOut Failed', error);
    });
  }
}
