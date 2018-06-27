import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Journey} from "../../models/journey.model";

/**
 * Generated class for the JourneysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journeys',
  templateUrl: 'journeys.html',
})
export class JourneysPage {

  journeys : Array<Journey>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data.journeys) {
      this.journeys = this.navParams.data.journeys;
    } else {
      this.journeys = [];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneysPage');
  }

}
