import { Medico } from './../../models/medico.model';
import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino )
    .subscribe( (medicos: any) => this.medicos = medicos  );
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde)
    .subscribe( (medicos: any) => this.medicos = medicos);
  }

  borrarMedico(medico: Medico ) {
      this._medicoService.borrarMedico( medico._id )
      .subscribe(() => this.cargarMedicos());
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this._medicoService.totalMedicos) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }

}
