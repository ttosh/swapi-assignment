import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PlanetPage } from './planet';
import { CharacterComponent } from '../../components/character/character';

@NgModule({
  declarations: [
    PlanetPage,
    CharacterComponent
  ],
  imports: [
    IonicPageModule.forChild(PlanetPage),
  ],
  exports: [
    PlanetPage,
    CharacterComponent
  ]
})
export class PlanetPageModule {}
