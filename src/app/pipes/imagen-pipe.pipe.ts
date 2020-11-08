import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipePipe implements PipeTransform {
  //Los pipe sirven para transformar lo visual de la aplicación
  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${base_url}/upload/${tipo}/${img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }

  }

}
