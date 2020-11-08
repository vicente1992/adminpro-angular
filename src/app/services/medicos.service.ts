import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from './../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private base_url = environment.base_url;
  constructor(
    private httClient: HttpClient,

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

  cargarMedicos() {
    //http://localhost:3000/api/v1/usuarios?desde=5
    const url = `${this.base_url}/medicos`;
    return this.httClient.get(url, this.headers)
      .pipe(map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos));
  }
  cargarMedicoId(id: string) {
    //http://localhost:3000/api/v1/usuarios?desde=5
    const url = `${this.base_url}/medicos/${id}`;
    return this.httClient.get(url, this.headers)
      .pipe(map((resp: { ok: boolean, medico: Medico }) => resp.medico));
  }

  crearMedico(medico: { nombre: string, hospital: string }) {
    const url = `${this.base_url}/medicos`;
    return this.httClient.post(url, medico, this.headers)
  }

  actualizarMedico(medico: Medico) {
    const url = `${this.base_url}/medicos/${medico._id}`;
    return this.httClient.put(url, medico, this.headers)
  }
  borrarMedico(_id: string) {
    const url = `${this.base_url}/medicos/${_id}`;
    return this.httClient.delete(url, this.headers)
  }

}
