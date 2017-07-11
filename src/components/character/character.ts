import { Component, Input } from '@angular/core';

import { SwapiProvider } from "../../providers/swapi/swapi";

import { CharacterSchema } from './character.schema';

@Component({
  selector: 'characters',
  templateUrl: 'character.html'
})
export class CharacterComponent {

  characterStrings: string[];
  currentCharacters: CharacterSchema[];

  constructor(private swapi: SwapiProvider) {
    this.characterStrings = [];
    this.currentCharacters = new Array<CharacterSchema>();
  }

  @Input()
  set characters(characters: string[]) {
    let self = this;
    this.characterStrings = characters;
    this.characterStrings.forEach(function (value) {
      let values: string[] = value.split('/');
      let personID: number = +values[values.length - 2];
      self.swapi.getCharacter(personID).subscribe(
        person => {
          self.currentCharacters = self.currentCharacters.concat(person);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  get characters() { return this.characterStrings; }
}
