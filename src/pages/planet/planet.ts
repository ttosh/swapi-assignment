import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlanetSchema } from './planet.schema';


@IonicPage()
@Component({
  selector: 'page-planet',
  templateUrl: 'planet.html'
})
export class PlanetPage implements OnInit {
  private planetUrl: string;
  private planet: PlanetSchema;
  private title: string = '';

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.planet = navParams.get('planet');
    this.planetUrl = navParams.get('planetUrl');
    this.title = navParams.get('title');
  }

  ngOnInit() {
    
  }

}
