import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public paginaDesde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private messageService: MessageService,
    private modalImagenSevice: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.getUsuarios();
    this.modalImagenSevice.nuevaImagen
      .pipe(delay(100)).subscribe(img => this.getUsuarios());
  }

  getUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.paginaDesde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }
  cambiarPagina(valor: number) {
    this.paginaDesde += valor;

    if (this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if (this.paginaDesde >= this.totalUsuarios) {
      this.paginaDesde -= valor;
    }
    this.getUsuarios();

  }


  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios', termino)
      .subscribe(usuarios => {
        this.usuarios = usuarios;

      })
  }

  eliminar(usuario: Usuario) {

    if (usuario.uid = this.usuarioService.uid) {
      return this.messageService.mensajeError('Error', 'El usuario no puede borrarse a si mismo');
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta  seguro de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(resp => {
          this.getUsuarios();
          this.messageService.mensajeSuccess
            ('Usuario borrado', `${usuario.nombre} eliminado correctamente`);

        });
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.cambiarRole(usuario)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenSevice.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
