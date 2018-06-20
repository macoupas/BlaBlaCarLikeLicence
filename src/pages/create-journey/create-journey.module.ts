import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateJourneyPage } from './create-journey';

@NgModule({
  declarations: [
    CreateJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateJourneyPage),
  ],
})
export class CreateJourneyPageModule {}
