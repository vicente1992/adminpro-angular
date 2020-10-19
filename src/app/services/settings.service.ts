import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  public changeTheme(theme: string) {
    //Cambia el tema del template
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrenTheme();

  }

  /**
  * Función que agregar la clase working
  */
  public checkCurrenTheme() {
    const link = document.querySelectorAll('.selector');
    link.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currenTheme = this.linkTheme.getAttribute('href');
      if (btnThemeUrl === currenTheme) {
        element.classList.add('working');
      }
    });

  }
}
