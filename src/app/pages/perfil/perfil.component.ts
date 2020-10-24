import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

//Services
import { MessageService } from 'src/app/services/message.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public pefilForm: FormGroup;
  public usuario: Usuario;
  public imagenASubir: File;
  public imgTemp: any = '';
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.pefilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }
  actuarlizarPerfil() {
    this.usuarioService.actualizarPerfil(this.pefilForm.value)
      .subscribe((resp: any) => {
        const { nombre, email } = this.pefilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        this.messageService.mensajeSuccess('', resp.message);

      }, (error) => {
        this.messageService.mensajeError('Error', error.error.message)
      });
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
    this.fileUploadService.actulizarFoto(this.imagenASubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        this.messageService.mensajeSuccess('', 'Imagen actualizada  exitosamente');
      }).catch(err => this.messageService.mensajeError('Error', 'Error al subir la imagen'));
  }
}
