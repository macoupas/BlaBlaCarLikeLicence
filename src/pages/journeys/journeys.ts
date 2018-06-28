import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Journey} from "../../models/journey.model";
import * as moment from "moment";
import {JourneyDetailPage} from "../journey-detail/journey-detail";

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
      journey.driver.get().then(userSnapshot => {
        let user = userSnapshot.data();
        console.debug('user', user);
        let startDate = moment.unix(journey.startDate.seconds).format("DD MMM YYYY à HH:mm");
        journeyTmp.driver = user;
        journeyTmp.startDate = startDate;
        this.journeys.push(journeyTmp);
      });
    });
  }

  ionViewDidLoad() {
  }

  goToDetailJourney(journey) {
    this.navCtrl.push(JourneyDetailPage, {journey: journey});
  }

}
