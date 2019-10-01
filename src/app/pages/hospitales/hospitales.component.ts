import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { HospitalService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales());
  }
  crearHospital() {
    swal({
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Nombre del hospital',
          type: 'text',
        },
      },
      buttons: {
        cancel: 'Cancelar',
        confirm: 'Crear',
      }
    }).then( (nombre: any) => {
      console.log('Se va a crear el hospital');
      console.log('confirmado: ', nombre);
      if ( !nombre || nombre.length === 0) {
        return;
      }
      this._hospitalService.crearHospital( nombre )
      .subscribe( ( resp: any) => this.cargarHospitales());
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe((hospitales: any) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  obtenerHospital( id: string ) {

  }

  buscarHospital( termino: string ) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital( termino )
    .subscribe( (hospitales: any) => this.hospitales = hospitales);
  }

  actualizarImagen( id: string ) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital( hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  borrarHospital( hospital: Hospital) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true

    }).then(( borrar: string) => {

      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id)
          .subscribe((borrado: any) => {
            console.log(borrado);
            console.log('desde: ' + this.desde + ' totalRegistros: ' + this._hospitalService.totalHospitales);
            if (this.desde >= this._hospitalService.totalHospitales - 1) {
              this.desde = 0;
            }
            this.cargarHospitales();
          });
      }
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this._hospitalService.totalHospitales) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }




}
