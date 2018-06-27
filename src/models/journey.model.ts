import {Place} from "./place.model";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Journey {
  uid: string,
  startPlace: Place,
  endPlace: Place,
  startDate: Timestamp,
  driverId: string,
  placesCar: number,
  remainingPlacesCar: number,
  price: number
}

export const JOURNEY_PATH = 'journeys';
