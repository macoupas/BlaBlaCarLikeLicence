import {IonicPage, NavController, Platform, ViewController} from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {} from '@types/googlemaps';
import {PlaceProvider} from "../../providers/place/place";

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

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
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

  getPlacePredictions(config) : Promise<any> {
    return new Promise(resolve => {
      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
        if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
          resolve(predictions);
        }
      });
    });
  }
}
