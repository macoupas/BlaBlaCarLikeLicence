export interface User {
  uid: string,
  username: string,
  photoUrl: string,
  name: string,
  firstName: string,
  mail: string,
  phone: string,
  age: Number,
  cars,
  comments,
  journeys
}

export const USER_PATH = 'users';
