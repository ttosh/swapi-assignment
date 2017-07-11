import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from "rxjs";

import { PlanetSchema } from '../../pages/planet/planet.schema';
import { CharacterSchema } from '../../components/character/character.schema';

import { SettingsPage } from '../../pages/settings/settings';

@Injectable()
export class SwapiProvider {
  
  private apiLangPref: string = '';
  private apiUrl: string = 'http://swapi.co/api';

  constructor(private http: Http) {
    this.apiLangPref = this.getLanguagePrefs();
  }

  private getLanguagePrefs(): string {
    let langPref = SettingsPage.getLanguagePrefs();
    return (langPref) ? langPref : '';
  }

  getPlanets(page: number): Observable<PlanetSchema[]> {
    this.apiLangPref = this.getLanguagePrefs();
    if(this.apiLangPref.toLowerCase() === 'wookie') {
      console.log('Should query with format="wookie", but api seems broken for most of these calls.');
    }
    return this.http.get(this.apiUrl + '/planets/?page=' + page)
      .map((response: Response) => response.json())
      .map(response => <PlanetSchema[]>response.results)
      .catch((e) => {
        return Observable.throw(e.json().error || 'Swapi Error retrieving planets.');
      });
  }

  getCharacter(id: number): Observable<CharacterSchema[]> {
    this.apiLangPref = this.getLanguagePrefs();
    if(this.apiLangPref.toLowerCase() === 'wookie') {
      console.log('Should query with format="wookie", but api seems broken for most of these calls.');
    }
    return this.http.get(this.apiUrl + '/people/')
      .map((response: Response) => response.json())
      .catch((e) => {
        return Observable.throw(e.json().error || 'Swapi Error retrieving person.');
      });
  }

  getCharacters(): Observable<CharacterSchema[]> {
    this.apiLangPref = this.getLanguagePrefs();
    if(this.apiLangPref.toLowerCase() === 'wookie') {
      console.log('Should query with format="wookie", but api seems broken for most of these calls.');
    }
    return this.http.get(this.apiUrl + '/people/')
      .map((response: Response) => response.json())
      .map(response => <PlanetSchema[]>response.results)
      .catch((e) => {
        return Observable.throw(e.json().error || 'Swapi Error retrieving people.');
      });
  }
}
