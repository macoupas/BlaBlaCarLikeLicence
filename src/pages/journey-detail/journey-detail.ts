import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from "moment";


/**
 * Generated class for the JourneyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journey-detail',
  templateUrl: 'journey-detail.html',
})
export class JourneyDetailPage {

  journey;

  date : string;

  isStartPlaceDetailShown: Boolean = false;
  isEndPlaceDetailShown: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.journey = this.navParams.data.journey;
  }

  ionViewDidLoad() {
  }

  toogleStartPlace() {
    this.isStartPlaceDetailShown = !this.isStartPlaceDetailShown;
  }

  toogleEndPlace() {
    this.isEndPlaceDetailShown = !this.isEndPlaceDetailShown;
  }

}
