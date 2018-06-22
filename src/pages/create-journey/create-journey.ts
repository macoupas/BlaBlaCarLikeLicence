import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {PlaceProvider} from "../../providers/place/place";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {Journey} from "../../models/journey.model";
import {FirestoreStorageProvider} from "../../providers/firestore-storage/firestore-storage";
import {
  CITY_DETAILS, COUNTRY_DETAILS, COUNTY_DETAILS, Place, POSTAL_CODE_DETAILS, REGION_DETAILS, STREET_DETAILS,
  STREET_NUMBER_DETAILS
} from "../../models/place.model";
import * as firebase from "firebase";
import * as moment from "moment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Timestamp = firebase.firestore.Timestamp;
import {AuthProvider} from "../../providers/auth/auth";

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
  errorMessages = [];

  startPlaces: any = [];
  endPlaces: any = [];
  searchDisabled: boolean;

  private journeyForm: FormGroup;

  journey: Journey = {
    uid: "",
    startPlace: null,
    endPlace: null,
    startDate: null,
    driverId: "",
    placesCar: 0,
    remainingPlacesCar: 0,
    price: 0
  };

  constructor(public maps: GoogleMapsProvider, public places: PlaceProvider, private fb: FormBuilder,
              public fs: FirestoreStorageProvider, private auth: AuthProvider) {
    this.searchDisabled = true;
    for(let i=1;i<=NB_PLACES_MAX; i++) {
      this.placesSelect.push(i);
    }

    this.journeyForm = this.fb.group({
      startQuery: ['', Validators.required],
      endQuery: ['', Validators.required],
      startDate: [''],
      startTime: [''],
      placesCar: [0, Validators.min(1)],
      price: [0, Validators.min(1)]
    });
  }

  ionViewDidLoad(): void {

    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.places.autocompleteService = new google.maps.places.AutocompleteService();
      this.places.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;

    });

  }

  createJourney() {

    if(this.formIsValid()) {
      let date = moment(this.journeyForm.value.startDate + " " + this.journeyForm.value.startTime).format();
      this.journey.uid = this.fs.createId();
      this.journey.startDate = Timestamp.fromDate(new Date(date));
      this.journey.driverId = this.auth.userConnected.uid;
      this.journey.placesCar = this.journeyForm.value.placesCar;
      this.journey.remainingPlacesCar = this.journeyForm.value.placesCar;
      this.journey.price = this.journeyForm.value.price;
      console.debug('journey', this.journey);
    }

  }

  selectPlace(place, type){

    this.startPlaces = [];

    this.places.getPlaceDetails(place).then((details) => {
      console.debug(details);

      if(type == "start") {
        this.journeyForm.patchValue({
          startQuery: details.formatted_address
        });
        this.startPlaces = [];
        this.setPlace(details, 'start');
      } else {
        this.journeyForm.patchValue({
          endQuery: details.formatted_address
        });
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
          this.journey.startPlace = null;
        } else {
          this.endPlaces = [];
          this.journey.endPlace = null;
        }
        console.debug('journey', this.journey);
        if(predictions) {
          predictions.forEach((prediction) => {
            if(type == "start") {
              this.startPlaces.push(prediction);
            } else {
              this.endPlaces.push(prediction);
            }
          });
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

  private setPlace(detailPlace, typePlace) {
    if(detailPlace.address_components) {
      if(typePlace == 'start') {
        this.journey.startPlace = {
          city: "",
          country: ""
        };
      } else {
        this.journey.endPlace = {
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
                  this.journey.startPlace.streetNumber = component.long_name;
                } else {
                  this.journey.endPlace.streetNumber = component.long_name;
                }
                break;
              }
              case STREET_DETAILS: {
                if(typePlace == 'start') {
                  this.journey.startPlace.street = component.long_name;
                } else {
                  this.journey.endPlace.street = component.long_name;
                }
                break;
              }
              case COUNTY_DETAILS: {
                if(typePlace == 'start') {
                  this.journey.startPlace.county = component.long_name;
                } else {
                  this.journey.endPlace.county = component.long_name;
                }
                break;
              }
              case REGION_DETAILS: {
                if(typePlace == 'start') {
                  this.journey.startPlace.region = component.long_name;
                } else {
                  this.journey.endPlace.region = component.long_name;
                }
                break;
              }
              case CITY_DETAILS: {
                if(typePlace == 'start') {
                  this.journey.startPlace.city = component.long_name;
                } else {
                  this.journey.endPlace.city = component.long_name;
                }
                break;
              }
              case COUNTRY_DETAILS: {
                if(typePlace == 'start') {
                  this.journey.startPlace.country = component.long_name;
                } else {
                  this.journey.endPlace.country = component.long_name;
                }
                break;
              }
              case POSTAL_CODE_DETAILS: {
                if(typePlace == 'start') {
                  this.journey.startPlace.postalCode = component.long_name;
                } else {
                  this.journey.endPlace.postalCode = component.long_name;
                }
                break;
              }
              default: break;
            }
          })
        }
      })
    }
    console.debug('journey', this.journey);
  }

  private formIsValid() {
    if(!this.journeyForm.valid.valueOf()) {
      this.errorMessages = [];
      if(this.journeyForm.controls.startQuery.invalid) {
        this.errorMessages.push("Veuillez renseigner l'adresse de départ") ;
      }
      if(this.journeyForm.controls.endQuery.invalid) {
        this.errorMessages.push("Veuillez renseigner l'adresse d'arrivée");
      }
      if(this.journeyForm.controls.startDate.invalid) {
        this.errorMessages.push("Veuillez renseigner la date du départ");
      }
      if(this.journeyForm.controls.startTime.invalid) {
        this.errorMessages.push("Veuillez renseigner l'heure du départ");
      }
      if(this.journeyForm.controls.placesCar.invalid) {
        this.errorMessages.push("Veuillez renseigner un nombre de places supérieur à 0");
      }
      if(this.journeyForm.controls.price.invalid) {
        this.errorMessages.push("Veuillez renseigner un prix supérieur à 0");
      }
      return false;
    }

    this.errorMessages = [];
    return true;
  }
}
