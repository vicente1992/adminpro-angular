import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService

  ) {

    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
