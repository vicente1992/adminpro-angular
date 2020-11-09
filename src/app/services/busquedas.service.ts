import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.models';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  private base_url = environment.base_url;
  constructor(private httClient: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  busquedaGlobal(termino: string) {
    const url = `${this.base_url}/todo/${termino}`;
    return this.httClient.get(url, this.headers)
  }
  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }
  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados;
  }
  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados;
  }
  buscar(tipo: 'medicos' | 'usuarios' | 'hospitales', termino: string) {
    const url = `${this.base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.httClient.get<any[]>(url, this.headers)
      .pipe(map((resp: any) => {
        console.log(resp);
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.usuarios);
          case 'hospitales':
            return this.transformarHospitales(resp.hospitales);
          case 'medicos':
            return this.transformarMedicos(resp.medicos);
          default:
            return [];
        }
      }));
  }
}
