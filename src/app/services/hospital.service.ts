import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from './../models/hospitales.models';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private base_url = environment.base_url;
  constructor(
    private httClient: HttpClient
  ) { }

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

  cargarHospitales() {
    //http://localhost:3000/api/v1/usuarios?desde=5
    const url = `${this.base_url}/hospitales`;
    return this.httClient.get(url, this.headers)
      .pipe(map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales));
  }

  crearHospital(nombre: string) {
    const url = `${this.base_url}/hospitales`;
    return this.httClient.post(url, { nombre }, this.headers)
  }

  actualizarHospital(_id: string, nombre: string) {
    const url = `${this.base_url}/hospitales/${_id}`;
    return this.httClient.put(url, { nombre }, this.headers)
  }
  borrarHospital(_id: string) {
    const url = `${this.base_url}/hospitales/${_id}`;
    return this.httClient.delete(url, this.headers)
  }
  
}
