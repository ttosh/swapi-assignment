import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlanetPage } from '../planet/planet';
import { PlanetSchema } from '../planet/planet.schema';

import { SwapiProvider } from "../../providers/swapi/swapi";

@Component({
  selector: 'page-home',
  templateUrl: 'planets.html',
  providers: [SwapiProvider]
})
export class PlanetsPage implements OnInit {

  private planets: PlanetSchema[];
  private pageNumber: number;
  private planetPageLimit: number;

  constructor(public navCtrl: NavController, private swapi: SwapiProvider) {
    this.planets = new Array<PlanetSchema>();
    this.pageNumber = 1;
    this.planetPageLimit = 10;
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    let self = this;
    this.pageNumber = 1;
    this.swapi.getPlanets(this.pageNumber++).subscribe(
      planets => {
        self.planets = planets;
      },
      err => {
        this.planets = new Array<PlanetSchema>();
      }
    );
  }

  doInfinite(infiniteScroll) {
    let self = this;
     this.swapi.getPlanets(self.pageNumber++).subscribe(
      nextPlanetSet => {
        self.planets = self.planets.concat(nextPlanetSet);
        if(self.planets.length % self.planetPageLimit === 0) {
          infiniteScroll.complete();
        } else {
          infiniteScroll.enabled = false ;
          this.pageNumber = 1;
        }
      },
      err => {
        this.planets = new Array<PlanetSchema>();
      }
    );
  }

  openPlanet(planet: PlanetSchema) {
    this.navCtrl.push(PlanetPage, {
      planet: planet,
      planetUrl: planet.url,
      title: planet.name
    });
  }

}
