import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CharacterSchema } from '../../components/character/character.schema';

import { TranslateService } from '@ngx-translate/core';
import { SwapiProvider } from "../../providers/swapi/swapi";

@Component({
  selector: 'page-contact',
  templateUrl: 'people.html',
  providers: [SwapiProvider]
})
export class PeoplePage implements OnInit {
  
  private people: CharacterSchema[];
  private title: string;
  private searchPlaceHolder: string;
  private searchResults: CharacterSchema[];

  constructor(public navCtrl: NavController, private swapi: SwapiProvider, private translateService: TranslateService) {
    this.people = new Array<CharacterSchema>();
    this.searchPlaceHolder = "Search";
    this.title = "People";
    this.searchResults = new Array<CharacterSchema>();
    this.translateService.setDefaultLang(navigator.language.split('-')[0]);
  }

  ngOnInit(): void {
    let self = this;
    this.translateService.get(self.searchPlaceHolder).subscribe(value => {
      self.searchPlaceHolder = value;
    })

    this.translateService.get(self.title).subscribe(value => {
      self.title = value;
    })
  }

  ionViewDidEnter() {
    let self = this;
    this.swapi.getCharacters().subscribe(
      results => {
        self.people = results;
        self.initializeSearchResults(results);
      },
      err => {
        console.log(err);
      }
    );
  }

  initializeSearchResults(results: CharacterSchema[]): void {
    this.searchResults = results;
  }

  getPeople(ev) {
    this.initializeSearchResults(this.people);
    let searchTerm = ev.target.value;
    if (searchTerm && searchTerm.trim() != '') {
      this.searchResults = this.searchResults.filter((person) => {
        return (person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    } 
  }

}
