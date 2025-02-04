import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

//interface
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

//Models
import { Usuario } from '../models/usuario.model';

declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private base_url = environment.base_url;
  public usuario: Usuario;
  auth2: any;
  constructor(
    private httClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  get role(): 'USER_ROLE' | 'ADMIN_ROLE' {
    return this.usuario.role;
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  googleInit() {

    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '175175578651-549sdtsd8glg6c6lu33oslg40o97hn92.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });

    });
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  validarToken(): Observable<boolean> {

    return this.httClient.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(map((resp: any) => {
      const {
        nombre,
        email,
        img = '',
        google,
        role,
        uid,
      } = resp.usuario;
      this.usuario = new Usuario(
        nombre,
        email,
        '',
        img,
        google,
        role,
        uid,
      );
      this.guardarLocalStorage(resp.token, resp.menu);
      return true;
    }),
      catchError(error => of(false))
    );
  }

  crearUsurio(formData: RegisterForm) {
    return this.httClient.post(`${this.base_url}/usuarios`, formData)
      .pipe(tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.httClient.put(`${this.base_url}/usuarios/${this.uid}`, data, this.headers);
  }
  login(formData: LoginForm) {
    return this.httClient.post(`${this.base_url}/login`, formData)
      .pipe(tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
      );
  }
  loginGoogle(token) {
    return this.httClient.post(`${this.base_url}/login/google`, { token })
      .pipe(tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
      );
  }

  cargarUsuarios(desde: number = 0) {
    //http://localhost:3000/api/v1/usuarios?desde=5
    const url = `${this.base_url}/usuarios?desde=${desde}`;
    return this.httClient.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(
            user =>
              new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
          );
          return {
            total: resp.total,
            usuarios
          }
        })
      );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${this.base_url}/usuarios/${usuario.uid}`;
    return this.httClient.delete(url, this.headers)
  }


  cambiarRole(usuario: Usuario) {
    return this.httClient.put(`${this.base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
