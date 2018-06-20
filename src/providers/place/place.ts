import { Injectable } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;

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
}
