import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreationProfilePage } from './creationProfile';

@NgModule({
  declarations: [
    CreationProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CreationProfilePage),
  ],
})
export class CreationProfilePageModule {}
