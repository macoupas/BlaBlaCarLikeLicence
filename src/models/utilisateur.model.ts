import { StorageProvider } from "../providers/storage/storage";

export class UtilisateurModel {

  constructor(public nom: String, public prenom: String, public mail: String, public telephone: String,
              public age: number, public voitures: any[], private mdp: String,
              private storage:StorageProvider) {
  }

  get() {
    this.storage.getValue('user').then(user => {
      console.debug('nom', user.nom);
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.mail = user.mail;
      this.telephone = user.telephone;
      this.age = user.age;
      this.voitures = user.voitures;
      this.mdp = user.mdp;
    });
  }

  save() {
    this.storage.setValue('user', {
      nom: this.nom,
      prenom: this.prenom,
      mail: this.mail,
      telephone: this.telephone,
      age: this.age,
      voitures: this.voitures,
      mdp: this.mdp
    });
  }
}
