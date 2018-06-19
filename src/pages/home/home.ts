import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {SearchJourneyPage} from "../search-journey/search-journey";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, auth: AuthProvider) {
  }

  searchJourney() {
    this.navCtrl.push(SearchJourneyPage);
  }
}
