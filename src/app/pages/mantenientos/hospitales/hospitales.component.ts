import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Hospital } from './../../../models/hospitales.models';

import { HospitalService } from './../../../services/hospital.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(
    private hospitalService: HospitalService,
    private messageService: MessageService,
    private modalImagenSevice: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getHospitales();
    this.imgSubs = this.imgSubs = this.modalImagenSevice.nuevaImagen
      .pipe(delay(100)).subscribe(img => this.getHospitales());
  }

  getHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }
  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        this.messageService.mensajeSuccess('Actualizado', hospital.nombre);
      });
  }
  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(resp => {
        this.getHospitales();
        this.messageService.mensajeSuccess('Borrado', hospital.nombre);
      });
  }
  async abrirSweetalert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital);
        });

    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenSevice.abrirModal('hospitales', hospital._id, hospital.img);
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getHospitales();
    }
    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => {
        console.log(resp);
        this.hospitales = resp;

      });
  }
}
