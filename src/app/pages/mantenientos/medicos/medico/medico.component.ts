import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitales.models';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  constructor(
    private hospitalService: HospitalService,
    private fb: FormBuilder,
    private medicosService: MedicosService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.getMedico(id));
    this.getHospitales();
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === hospitalId);

      })
  }

  public getHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      })
  }

  public getMedico(id: string) {

    if (id === 'nuevo') {
      return
    }

    this.medicosService.cargarMedicoId(id)
      .pipe(delay(100))
      .subscribe(medico => {
        if (!medico) {
          this.router.navigateByUrl('/dashboard/medicos');
        }
        const { nombre, hospital } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: hospital });
      })

  }

  public guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicosService.actualizarMedico(data)
        .subscribe(response => {
          this.messageService.mensajeSuccess('Actualizado', `${nombre} actualizado éxitosamente`)
        })
    } else {
      this.medicosService.crearMedico(this.medicoForm.value)
        .subscribe(response => {
          this.messageService.mensajeSuccess('Registrado', 'Médico registrado éxitosamente')
          this.medicoForm.reset();
        })

    }

  }

}
