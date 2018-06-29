import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {JourneyDetailPage} from "../journey-detail/journey-detail";
import {Journey} from "../../models/journey.model";
import {FirestoreStorageProvider} from "../../providers/firestore-storage/firestore-storage";
import {AuthProvider} from "../../providers/auth/auth";
import {USER_JOURNEY_PATH, USER_PASSENGER_PATH, USER_PATH} from "../../models/user.model";
import * as moment from "moment";

/**
 * Generated class for the MyJourneysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-journeys',
  templateUrl: 'my-journeys.html',
})
export class MyJourneysPage {

  passengerJourneys: Array<Journey> = [];
  myJourneys: Array<Journey> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private fs: FirestoreStorageProvider,
              private auth: AuthProvider) {
    this.fs.getSecondDocuments(USER_PATH, this.auth.userConnected.uid, USER_JOURNEY_PATH).then((journeys) => {
      if(journeys) {
        journeys.forEach(journey => {
          journey.ref.get().then(journeySnapshot => {
            let journey = journeySnapshot.data();
            journey.driver.get().then(user => {
              let startDate = moment.unix(journey.startDate.seconds).format("DD MMM YYYY à HH:mm");
              journey.driver = user.data();
              journey.startDate = startDate;
              this.myJourneys.push(journey);
            });
          });
        });
      }
    });

    this.fs.getSecondDocuments(USER_PATH, this.auth.userConnected.uid, USER_PASSENGER_PATH).then((journeys) => {
      if(journeys) {
        journeys.forEach(journey => {
          journey.ref.get().then(journeySnapshot => {
            journey.ref.get().then(journeySnapshot => {
              let journey = journeySnapshot.data();
              journey.driver.get().then(user => {
                let startDate = moment.unix(journey.startDate.seconds).format("DD MMM YYYY à HH:mm");
                journey.driver = user.data();
                journey.startDate = startDate;
                this.passengerJourneys.push(journey);
              });
            });
          })
        });
      }
    });

    console.debug('myJourneys', this.myJourneys);
    console.debug('passengerJourneys', this.passengerJourneys);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyJourneysPage');
  }

  goToDetailJourney(journey) {
    this.navCtrl.push(JourneyDetailPage, {journey: journey, bookPossible: false});
  }
}
