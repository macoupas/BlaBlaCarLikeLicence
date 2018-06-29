import {Component, ViewChild} from '@angular/core';
import {App, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ProfilePage} from "../pages/profile/profile";
import {LoginPage} from '../pages/login/login';
import {AuthProvider} from "../providers/auth/auth";
import {ProfilPage} from '../pages/profil/profil';
import {MyJourneysPage} from "../pages/my-journeys/my-journeys";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private app: App, private auth: AuthProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Mon profil', component: ProfilePage},
      {title: 'Mes trajets', component: MyJourneysPage},
      {title: 'Mon profil publique', component: ProfilPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Mon profil publique'){
      this.nav.setRoot(page.component, {user: this.auth.userConnected})
    } else {
      this.nav.setRoot(page.component);
    }

  }

  logOut() {
    this.auth.signOut().then(() => {
      this.app.getActiveNav().setRoot(LoginPage);
    }).catch((error) => {
      console.error('SignOut Failed', error);
    });

  }

}
