export interface Utilisateur {
  uid: String,
  username: String,
  nom: String,
  prenom: String,
  mail: String,
  telephone: String,
  age: Number,
  voitures,
  commentaires,
  trajets
}

export const USER_PATH = 'utilisateurs';
