import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


//Servicios
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public formSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.registerForm = this.fb.group({
      nombre: ['Manuel', Validators.required],
      email: ['vic_ortiz20@hotmail.es', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      password2: ['123456', Validators.required],
      terminos: [false, Validators.required],
    }, {
      validators: this.passwordIguales('password', 'password2')
    });
  }
  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    //Crear usuarios
    this.usuarioService.crearUsurio(this.registerForm.value).subscribe(res => {
      //Navegar  al dashboard
      this.router.navigateByUrl('/');
    }, (err) => this.messageService.mensajeError('Error', err.error.message));
  }
  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenaNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }
  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGrop: FormGroup) => {
      const pass1Control = formGrop.get(pass1Name);
      const pass2Control = formGrop.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
}

