import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {PlaceProvider} from "../../providers/place/place";
import {Geolocation} from "@ionic-native/geolocation";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {forEach} from "@angular/router/src/utils/collection";
import {Journey} from "../../models/journey.model";
import {FirestoreStorageProvider} from "../../providers/firestore-storage/firestore-storage";
import {
  CITY_DETAILS, COUNTRY_DETAILS, COUNTY_DETAILS, Place, POSTAL_CODE_DETAILS, REGION_DETAILS, STREET_DETAILS,
  STREET_NUMBER_DETAILS
} from "../../models/place.model";

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

  startJourneyPlace: Place;
  endJourneyPlace: Place;

  journey: Journey = {
    uid: "",
    startPlace: null,
    endPlace: null,
    startDate: null,
    endDate: null,
    driverId: "",
    placesCar: 0,
    remainingPlacesCar: 0,
    price: 0
  };

  constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsProvider,
              public platform: Platform, public geolocation: Geolocation,
              public viewCtrl: ViewController, public places: PlaceProvider, public fs: FirestoreStorageProvider) {
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
        this.setPlace(details, 'start');
      } else {
        this.endQuery = details.formatted_address;
        this.endPlaces = [];
        this.setPlace(details, 'end');
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

  setPlace(detailPlace, typePlace) {
    if(detailPlace.address_components) {
      if(typePlace == 'start') {
        this.startJourneyPlace = {
          city: "",
          country: ""
        };
      } else {
        this.endJourneyPlace = {
          city: "",
          country: ""
        };
      }

      detailPlace.address_components.forEach(component => {
        if(component.types) {
          component.types.forEach(type => {
            switch (type) {
              case STREET_NUMBER_DETAILS: {
                if(typePlace == 'start') {
                  this.startJourneyPlace.streetNumber = component.long_name;
                } else {
                  this.endJourneyPlace.streetNumber = component.long_name;
                }
                break;
              }
              case STREET_DETAILS: {
                if(typePlace == 'start') {
                  this.startJourneyPlace.street = component.long_name;
                } else {
                  this.endJourneyPlace.street = component.long_name;
                }
                break;
              }
              case COUNTY_DETAILS: {
                if(typePlace == 'start') {
                  this.startJourneyPlace.county = component.long_name;
                } else {
                  this.endJourneyPlace.county = component.long_name;
                }
                break;
              }
              case REGION_DETAILS: {
                if(typePlace == 'start') {
                  this.startJourneyPlace.region = component.long_name;
                } else {
                  this.endJourneyPlace.region = component.long_name;
                }
                break;
              }
              case CITY_DETAILS: {
                if(typePlace == 'start') {
                  this.startJourneyPlace.city = component.long_name;
                } else {
                  this.endJourneyPlace.city = component.long_name;
                }
                break;
              }
              case COUNTRY_DETAILS: {
                if(typePlace == 'start') {
                  this.startJourneyPlace.country = component.long_name;
                } else {
                  this.endJourneyPlace.country = component.long_name;
                }
                break;
              }
              case POSTAL_CODE_DETAILS: {
                if(typePlace == 'start') {
                  this.startJourneyPlace.postalCode = component.long_name;
                } else {
                  this.endJourneyPlace.postalCode = component.long_name;
                }
                break;
              }
              default: break;
            }
          })
        }
      })
    }
    console.debug('startPlace', this.startJourneyPlace);
    console.debug('endPlace', this.endJourneyPlace);
  }
}
