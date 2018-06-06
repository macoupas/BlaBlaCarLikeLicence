import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreationComptePage } from './creation-compte';

@NgModule({
  declarations: [
    CreationComptePage,
  ],
  imports: [
    IonicPageModule.forChild(CreationComptePage),
  ],
})
export class CreationComptePageModule {}
