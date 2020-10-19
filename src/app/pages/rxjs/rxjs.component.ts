import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {
    const ob$ = new Observable(observe => {

    });
    //Continuar video 7
  }

  ngOnInit(): void {
  }

}
