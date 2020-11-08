import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { MedicosService } from './../../../services/medicos.service';
import { Medico } from './../../../models/medico.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MessageService } from 'src/app/services/message.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(
    private medicosService: MedicosService,
    private modalImagenSevice: ModalImagenService,
    private busquedasService: BusquedasService,
    private messageService: MessageService
  ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getMedicos();
    this.imgSubs = this.imgSubs = this.modalImagenSevice.nuevaImagen
      .pipe(delay(100)).subscribe(img => this.getMedicos());
  }

  public getMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      })
  }
  public abrirModal(medico: Medico) {
    this.modalImagenSevice.abrirModal('medicos', medico._id, medico.img);
  }

  public buscarMedico(termino: string) {
    if (termino.length === 0) {
      return this.getMedicos();
    }
    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {
        this.medicos = resp;
      });

  }
  public borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta  seguro de eliminar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.borrarMedico(medico._id).subscribe(resp => {
          this.getMedicos();
          this.messageService.mensajeSuccess
            ('Medico borrado', `${medico.nombre} eliminado correctamente`);

        });
      }
    })
  }

}
