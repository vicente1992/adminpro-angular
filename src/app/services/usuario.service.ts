import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

//interface
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private base_url = environment.base_url;
  constructor(private httClient: HttpClient) { }

  crearUsurio(formData: RegisterForm) {
    return this.httClient.post(`${this.base_url}/usuarios`, formData)
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
      );
  }

  login(formData: LoginForm) {
    return this.httClient.post(`${this.base_url}/login`, formData)
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
      );
  }
  loginGoogle(token) {
    return this.httClient.post(`${this.base_url}/login/google`, { token })
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
      );
  }
}
