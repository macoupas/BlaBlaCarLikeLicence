import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {PlaceProvider} from "../../providers/place/place";
import {Geolocation} from "@ionic-native/geolocation";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {forEach} from "@angular/router/src/utils/collection";

/**
 * Generated class for the CreateJourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const NB_PLACES_MAX = 10;

@IonicPage()
@Component({
  selector: 'page-create-journey',
  templateUrl: 'create-journey.html',
})
export class CreateJourneyPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  private placesSelect = [];

  latitude: number;
  longitude: number;
  startQuery: string = '';
  endQuery: string = '';
  startPlaces: any = [];
  endPlaces: any = [];
  searchDisabled: boolean;
  location: any;
  startJourneyMarker;
  endJourneyMarker;

  constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsProvider,
              public platform: Platform, public geolocation: Geolocation,
              public viewCtrl: ViewController, public places: PlaceProvider) {
    this.searchDisabled = true;
    for(let i=1;i<=NB_PLACES_MAX; i++) {
      this.placesSelect.push(i);
    }
  }

  ionViewDidLoad(): void {

    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.places.autocompleteService = new google.maps.places.AutocompleteService();
      this.places.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;

    });

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
      console.debug(details);
      this.zone.run(() => {

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();

        this.maps.map.setCenter({lat: location.lat, lng: location.lng});

        if(type == "start") {
          this.startJourneyMarker = new google.maps.Marker({
            map: this.maps.map,
            position: location
          });
        } else {
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
