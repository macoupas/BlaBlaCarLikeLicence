import {IonicPage, NavController, Platform, ViewController} from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {} from '@types/googlemaps';
import {PlaceProvider} from "../../providers/place/place";
import * as moment from "moment";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {Place} from "../../models/place.model";
import {Filter} from "../../models/filter.model";
import {FirestoreStorageProvider} from "../../providers/firestore-storage/firestore-storage";
import {JOURNEY_PATH} from "../../models/journey.model";

/**
 * Generated class for the SearchJourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-journey',
  templateUrl: 'search-journey.html',
})
export class SearchJourneyPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  minDate: string;
  maxDate: string;

  latitude: number;
  longitude: number;

  startQuery: string = '';
  endQuery: string = '';

  startJourneyPlace: Place;
  endJourneyPlace: Place;
  startDate: string;
  startTime: string;

  startPlaces: any = [];
  endPlaces: any = [];
  searchDisabled: boolean;
  location: any;
  startJourneyMarker;
  endJourneyMarker;


  constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsProvider,
              public platform: Platform, public geolocation: Geolocation, private fs: FirestoreStorageProvider,
              public viewCtrl: ViewController, public places: PlaceProvider) {
    this.searchDisabled = true;
  }

  ionViewDidLoad(): void {

    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.places.autocompleteService = new google.maps.places.AutocompleteService();
      this.places.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;

    });

    this.minDate = moment().format('YYYY-MM-DD');
    this.maxDate = moment().add(1, 'year').format('YYYY');

  }

  searchJourney() {
    if(this.startJourneyPlace == null || this.endJourneyPlace == null) {
      console.error('Start place and End place undefined');
    } else {
      let queryFilters: Array<Filter> = [];
      queryFilters.push({field: "startPlace.city", operator: "==", value: this.startJourneyPlace.city});
      if(!this.startDate) {
        this.startDate = this.minDate;
        if(!this.startTime) {
          this.startTime = '00:00';
        }
      }
      let date = moment(this.startDate + " " + this.startTime).format();
      let timestamp = Timestamp.fromMillis(parseInt(moment(date).format('x')));
      queryFilters.push({field: "startDate", operator: ">=", value: timestamp});
      this.fs.getDocuments(JOURNEY_PATH,queryFilters).then(journeys => {
        console.debug('journeys', journeys);
      });
    }
  }

  selectPlace(place, type){

    this.startPlaces = [];

    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    if(type == "start") {
      if(this.startJourneyMarker) {
        this.startJourneyMarker.setMap(null);
      }
    } else {
      if(this.endJourneyMarker) {
        this.endJourneyMarker.setMap(null);
      }
    }

    this.places.getPlaceDetails(place).then((details) => {
      this.zone.run(() => {

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();

        this.maps.map.setCenter({lat: location.lat, lng: location.lng});

        if(type == "start") {
          this.startJourneyPlace = this.places.setPlace(details);
          this.startJourneyMarker = new google.maps.Marker({
            map: this.maps.map,
            position: location
          });
        } else {
          this.endJourneyPlace = this.places.setPlace(details);
          this.endJourneyMarker = new google.maps.Marker({
            map: this.maps.map,
            position: location
          });
        }
        this.location = location;
      });

      if(type == "start") {
        this.startQuery = details.formatted_address;
        this.startPlaces = [];
      } else {
        this.endQuery = details.formatted_address;
        this.endPlaces = [];
      }
    });
  }

  searchPlaces(query: string, type: string){
    if(!this.searchDisabled) {
      this.places.getPlacePredictions(query).then((predictions) => {
        console.debug('predictions', predictions);
        if(type == "start") {
          this.startPlaces = [];
        } else {
          this.endPlaces = [];
        }
        if(predictions) {
          predictions.forEach((prediction) => {
            if(type == "start") {
              this.startPlaces.push(prediction);
            } else {
              this.endPlaces.push(prediction);
            }
          });
        } else {
          if(type == "start") {
            if(this.startJourneyMarker) {
              this.startJourneyMarker.setMap(null);
            }
          } else {
            if(this.endJourneyMarker) {
              this.endJourneyMarker.setMap(null);
            }
          }
        }
      });
    } else {
      if(type == "start") {
        this.startPlaces = [];
      } else {
        this.endPlaces = [];
      }
    }
  }
}
