export interface Utilisateur {
  uid: string,
  username: string,
  photoUrl: string,
  nom: string,
  prenom: string,
  mail: string,
  telephone: string,
  age: Number,
  voitures,
  commentaires,
  trajets
}

export const USER_PATH = 'utilisateurs';
