import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actulizarFoto(
    archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    //http://localhost:3000/api/v1/upload/medicos/5f8fc355decbe7b3d0bad5a4
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await resp.json();
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
