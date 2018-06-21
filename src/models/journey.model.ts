import {Place} from "./place.model";
import {DateTime} from "ionic-angular";

export interface Journey {
  uid: string,
  startPlace: Place,
  endPlace: Place,
  startDate: DateTime,
  endDate: DateTime,
  driverId: string,
  placesCar: number,
  remainingPlacesCar: number,
  price: number
}

export const JOURNEY_PATH = 'journeys';
