import {Car} from "./car.model";
import * as firebase from "firebase";

export interface User {
  uid: string,
  username: string,
  photoUrl: string,
  name: string,
  firstName: string,
  mail: string,
  phone: string,
  age: Number,
  cars: Car[],
  comments
}

export const USER_PATH = 'users';
export const USER_JOURNEY_PATH : string = 'journeys';
export const USER_PASSENGER_PATH = 'passengerJourneys';
