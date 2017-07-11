import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [TranslateService]
})
export class SettingsPage implements OnInit {

  private title: string;
  private header: string;
  private basicLabel: string;
  private wookieLabel: string;

  // tslint:disable-next-line:no-unused-variable
  private language = {
    type: 'basic'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private translateService: TranslateService) {
    this.title = 'Settings';
    this.header = 'Language';
    this.basicLabel = 'Galactic Basic';
    this.wookieLabel = 'Wookie';
    this.translateService.setDefaultLang(navigator.language.split('-')[0]);
  }

  ngOnInit(): void {
    let self = this;
    this.translateService.get(self.title).subscribe(value => {
      self.title = value;
    })

    this.translateService.get(self.header).subscribe(value => {
      self.header = value;
    })

    this.translateService.get(self.basicLabel).subscribe(value => {
      self.basicLabel = value;
    })

    this.translateService.get(self.wookieLabel).subscribe(value => {
      self.wookieLabel = value;
    })
  }

  setLanguagePrefs(): void {
    localStorage.setItem('lang-pref', this.language.type);
  }

  static getLanguagePrefs(): string {
    let langPref = localStorage.getItem('lang-pref');
    if(!langPref || langPref === 'basic') {
      langPref = '';
    }
    return langPref;
  }
}

