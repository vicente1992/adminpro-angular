import {
  Component,
  OnInit
} from '@angular/core';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { MessageService } from 'src/app/services/message.service';

import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService,
    private messageService: MessageService
  ) { }
  public imagenASubir: File;
  public imgTemp: any = '';
  ngOnInit(): void {
  }
  cerraModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }
  cambiarImg(file: File) {
    this.imagenASubir = file;
    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }
  subirImg() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService.actulizarFoto(this.imagenASubir, tipo, id)
      .then(img => {
        //Emite la img actualiza  al cualquier componente que se subcriba
        this.modalImagenService.nuevaImagen.emit(img);
        this.messageService.mensajeSuccess('', 'Imagen actualizada  exitosamente');
        this.modalImagenService.cerrarModal();

      }).catch(err => this.messageService.mensajeError('Error', 'Error al subir la imagen'));
  }
}
