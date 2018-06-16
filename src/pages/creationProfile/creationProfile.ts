import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the CreationProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creation-profile',
  templateUrl: 'creationProfile.html',
})
export class CreationProfilePage {

  private registrationForm: FormGroup;

  errorMessages = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder,
              private auth:AuthProvider) {
    this.registrationForm = this.formBuilder.group({
      username: [''],
      name: [''],
      firstName: [''],
      age: [0, Validators.min(0)],
      mail: [''],
      password: [''],
      passwordConfirm: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreationProfilePage');
  }

  signUp() {
    if(!this.formIsValid()) {
      console.error('Formulaire non valide', this.registrationForm);
    } else {
      console.log('signUp');
    }

  }

  private formIsValid() {
    if(!this.registrationForm.valid.valueOf()) {
      this.errorMessages = [];
      if(this.registrationForm.controls.username.invalid) {
        this.errorMessages.push("Veuillez renseigner votre username") ;
      }
      if(this.registrationForm.controls.name.invalid) {
        this.errorMessages.push("Veuillez renseigner votre nom");
      }
      if(this.registrationForm.controls.firstName.invalid) {
        this.errorMessages.push("Veuillez renseigner votre prénom");
      }
      if(this.registrationForm.controls.age.invalid) {
        this.errorMessages.push("Veuillez verifier que votre age est supérieur à 0");
      }
      if(this.registrationForm.controls.mail.invalid) {
        this.errorMessages.push("Veuillez renseigner votre mail");
      }
      if(this.registrationForm.controls.firstName.invalid) {
        this.errorMessages.push("Veuillez renseigner votre mot de passe");
      }
      return false;
    }
    if(this.registrationForm.value.passwordConfirm != this.registrationForm.value.password) {
      this.errorMessages = [];
      this.errorMessages.push("Mots de passe différents");
      return false;
    }
    this.errorMessages = [];
    return true;
  }
}
