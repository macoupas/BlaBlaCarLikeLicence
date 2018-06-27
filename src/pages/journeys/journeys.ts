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

  journeysParams : Array<Journey>;
  journeys: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data.journeys) {
      this.journeysParams = this.navParams.data.journeys;
    } else {
      this.journeysParams = [];
    }

    this.journeysParams.forEach(journey => {
      let journeyTmp : any = journey;
      journey.driver.get().then(user => {
        journeyTmp.driver = user.data();
        this.journeys.push(journeyTmp);
      });
    });
  }

  ionViewDidLoad() {
  }

}
