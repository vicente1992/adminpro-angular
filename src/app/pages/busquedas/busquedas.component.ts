import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospitales.models';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    })
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino)
      .subscribe((response: any) => {
        this.usuarios = response.usuarios;
        this.hospitales = response.hospitales;
        this.medicos = response.medicos;
        console.log(response);
      })

  }

}
