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
  newUser: boolean;
  private authenticated = false;

  constructor(private afAuth: AngularFireAuth, private fs: FirestoreStorageProvider) {

  }

  isAuthenticated() {
    return new Promise((resolve => {
      this.afAuth.authState.subscribe(user => {
        if (user != null) {
          this.setUserConnected(user).then(() => {
            resolve(this.authenticated);
          });
        } else {
          this.authenticated = false;
          resolve(this.authenticated);
        }
      });
    }))
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.setUserConnected(credential.user).then((user) => {
            resolve(user);
          });
        }).catch((error) => {
        reject(error);
      });
    })
  }

  signInWithEmailAndPassword(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(credential => {
        console.log('authUser', credential);
        let newUser = {
          uid: credential.user.uid,
          username: credential.user.displayName,
          photoUrl: credential.user.photoURL ? credential.user.photoUrl : "https://lh3.googleusercontent.com/-B9i-RZi6N2k/AAAAAAAAAAI/AAAAAAAAAAA/UPUF_A8N9u8/photo.jpg",
          name: "",
          firstName: "",
          mail: credential.user.email,
          phone: credential.user.phoneNumber ? credential.user.phoneNumber : "",
          age: null,
          cars: [],
          comments: [],
          journeys: []
        };
         resolve(newUser);
      }).catch(error => {
        reject(error);
      });
    })
  }

  setUserConnected(user) : Promise<User> {
    return new Promise( (resolve, reject) => {
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
          this.authenticated = true;
          this.newUser = true;
          console.log('userConnected', this.userConnected);
          resolve(this.userConnected);
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
          this.authenticated = true;
          this.newUser = false;
          console.log('userConnected', this.userConnected);
          resolve(this.userConnected);
        }
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    })

  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}
