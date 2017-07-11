import { Component, OnInit } from '@angular/core';

import { PeoplePage } from '../people/people';
import { PlanetsPage } from '../planets/planets';
import { SettingsPage } from "../settings/settings";

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  
  tab1Root = PlanetsPage;
  tab2Root = PeoplePage;
  tab3Root = SettingsPage;

  tab1Title = 'Worlds';
  tab2Title = 'People';
  tab3Title = 'Settings';

  constructor(private translateService: TranslateService) {
   this.translateService.setDefaultLang(navigator.language.split('-')[0]);
  }
  
  ngOnInit(): void {
    let self = this;
    this.translateService.get(self.tab1Title).subscribe(value => {
      self.tab1Title = value;
    })

    this.translateService.get(self.tab2Title).subscribe(value => {
      self.tab2Title = value;
    })

    this.translateService.get(self.tab3Title).subscribe(value => {
      self.tab3Title = value;
    })
  }

}
