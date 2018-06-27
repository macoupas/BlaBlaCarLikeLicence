import {Place} from "./place.model";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import DocumentReference = firebase.firestore.DocumentReference;

export interface Journey {
  uid: string,
  startPlace: Place,
  endPlace: Place,
  startDate: Timestamp,
  driver: DocumentReference,
  placesCar: number,
  remainingPlacesCar: number,
  price: number
}

export const JOURNEY_PATH = 'journeys';
