import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyJourneysPage } from './my-journeys';

@NgModule({
  declarations: [
    MyJourneysPage,
  ],
  imports: [
    IonicPageModule.forChild(MyJourneysPage),
  ],
})
export class MyJourneysPageModule {}
