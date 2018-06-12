import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {auth} from "firebase";
import {App, NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";
import {FirestoreStorageProvider} from "../firestore-storage/firestore-storage";
import {ComptePage} from "../../pages/compte/compte";
import {Utilisateur} from "../../models/utilisateur.model";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  utilisateurConnectee: Utilisateur;

  private navCtrl: NavController;

  constructor(private afAuth: AngularFireAuth, private fs: FirestoreStorageProvider, private app: App) {
    this.afAuth.authState.subscribe(user => {
      this.navCtrl = app.getActiveNav();
      if (user != null) {
        console.debug('user', user);
        this.fs.getUtilisateur(user.uid).then((utilisateur) => {
          if (utilisateur == null) {
            this.utilisateurConnectee = {
              uid: user.uid,
              username: user.displayName,
              photoUrl: user.photoURL,
              nom: "",
              prenom: "",
              mail: user.email,
              telephone: user.phoneNumber ? user.phoneNumber : "",
              age: null,
              voitures: [],
              commentaires: [],
              trajets: []
            };
            console.log('utilisateurConnectee', this.utilisateurConnectee);
            this.navCtrl.setRoot(ComptePage);
          } else {
            console.log('utilisateur', utilisateur);
            let utilisateurConnectee = JSON.parse(JSON.stringify(utilisateur));
            this.utilisateurConnectee = {
              uid: utilisateurConnectee.uid,
              username: utilisateurConnectee.username,
              photoUrl: utilisateurConnectee.photoUrl,
              nom: utilisateurConnectee.nom,
              prenom: utilisateurConnectee.prenom,
              mail: utilisateurConnectee.mail,
              telephone: utilisateurConnectee.telephone,
              age: utilisateurConnectee.age,
              voitures: utilisateurConnectee.voitures,
              commentaires: utilisateurConnectee.commentaires,
              trajets: utilisateurConnectee.trajets
            };
            console.log('utilisateurConnectee', this.utilisateurConnectee);
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
        this.fs.getUtilisateur(credential.user.uid).then((utilisateur) => {
          console.log(utilisateur);
          if (utilisateur == null) {
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
