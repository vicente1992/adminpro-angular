import {
  EventEmitter,
  Injectable
} from '@angular/core';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  //Evento de notificación al componente
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  private _ocultarModal: boolean = true;
  public tipo: 'medicos' | 'usuarios' | 'hospitales';
  public id: string;
  public img: string;
  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }
  abrirModal(
    tipo: 'medicos' | 'usuarios' | 'hospitales',
    id: string,
    img: string = 'no-image'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    //this.img = img;
    if (img.includes("https")) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
    //http://localhost:3000/api/v1/upload/medicos/792aac24-53da-4832-84ed-b9a9cf7917bc.jpg
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
}
