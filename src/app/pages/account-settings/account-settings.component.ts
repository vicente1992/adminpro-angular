import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  public link: NodeListOf<Element>;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.checkCurrenTheme();
  }

  public changeTheme(theme: string) {

    this.settingsService.changeTheme(theme);

  }

  /**
   * Función que agregar la clase working
   */
  // public checkCurrenTheme() {

  //   this.link.forEach(element => {
  //     element.classList.remove('working');
  //     const btnTheme = element.getAttribute('data-theme');
  //     const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
  //     const currenTheme = this.linkTheme.getAttribute('href');
  //     if (btnThemeUrl === currenTheme) {
  //       element.classList.add('working');
  //     }
  //   });

  // }
}
