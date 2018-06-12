import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder) {
    this.registrationForm = this.formBuilder.group({
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
    console.log('signUp');
  }
}
