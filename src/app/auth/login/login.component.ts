import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public auth2: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.renderButton();
  }

  crearFormulario() {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remenber: [false]
    });
  }


  public login() {
    this.usuarioService.login(this.loginForm.value).subscribe(res => {
      const remenber = this.loginForm.get('remenber').value;
      const email = this.loginForm.get('email').value;
      if (remenber) {
        localStorage.setItem('email', email);
      } else {
        localStorage.removeItem('email');
      }
      console.log(res);
    }, (err) => this.messageService.mensajeError('Error', err.error.message))
    //this.router.navigateByUrl('/');
  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '175175578651-549sdtsd8glg6c6lu33oslg40o97hn92.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        this.usuarioService.loginGoogle(id_token).subscribe();
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
