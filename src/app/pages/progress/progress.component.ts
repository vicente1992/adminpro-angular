import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  progreso1: number = 45;
  progreso2: number = 35;

  get getProgreso1() {
    return `${this.progreso1}%`
  }
  get getProgreso2() {
    return `${this.progreso2}%`
  }
  public cambioValorHijo(valor: number) {
    console.log('Hola desde el padre', valor);
  }
}
