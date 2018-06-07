import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the CreationComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creation-compte',
  templateUrl: 'creation-compte.html',
})
export class CreationComptePage {

  private inscriptionForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder) {
    this.inscriptionForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      age: [0, Validators.min(0)],
      mail: [''],
      mdp: [''],
      mdpConfirm: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreationComptePage');
  }

  inscription() {
    console.log('inscription');
  }
}
