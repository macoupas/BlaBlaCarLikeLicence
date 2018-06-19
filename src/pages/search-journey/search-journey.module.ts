import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchJourneyPage } from './search-journey';

@NgModule({
  declarations: [
    SearchJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchJourneyPage),
  ],
})
export class SearchJourneyPageModule {}
