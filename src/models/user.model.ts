import {Car} from "./car.model";
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
  comments,
  journeys
}

export const USER_PATH = 'users';
