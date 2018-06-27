import { Injectable } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;
import {
  CITY_DETAILS, COUNTRY_DETAILS, COUNTY_DETAILS, Place, POSTAL_CODE_DETAILS, REGION_DETAILS, STREET_DETAILS,
  STREET_NUMBER_DETAILS
} from "../../models/place.model";

/*
  Generated class for the PlaceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlaceProvider {

  autocompleteService: any;
  placesService: any;

  constructor() {
  }

  getPlaceDetails(place) : Promise<PlaceResult> {

    return new Promise(resolve => {
      this.placesService.getDetails({placeId: place.place_id}, (details) => {
        console.debug(details);
        resolve(details);
      });
    });

  }

  getPlacePredictions(query) : Promise<any> {
    return new Promise(resolve => {
      if (query.length > 0) {
        let config = {
          types: ['geocode'],
          input: query
        };

        this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
            resolve(predictions);
          }
        });
      } else {
        resolve(null);
      }
    });
  }

  setPlace(details) : Place {
    let place : Place = {
      city: "",
      country: ""
    };
    if(details.address_components) {
      details.address_components.forEach(component => {
        if(component.types) {
          component.types.forEach(type => {
            switch (type) {
              case STREET_NUMBER_DETAILS: {
                place.streetNumber = component.long_name;
                break;
              }
              case STREET_DETAILS: {
                place.street = component.long_name;
                break;
              }
              case COUNTY_DETAILS: {
                place.county = component.long_name;
                break;
              }
              case REGION_DETAILS: {
                place.region = component.long_name;
                break;
              }
              case CITY_DETAILS: {
                place.city = component.long_name;
                break;
              }
              case COUNTRY_DETAILS: {
                place.country = component.long_name;
                break;
              }
              case POSTAL_CODE_DETAILS: {
                place.postalCode = component.long_name;
                break;
              }
              default: break;
            }
          })
        }
      });
      console.debug('place', place);
      return place;
    }
    return null;
  }
}
