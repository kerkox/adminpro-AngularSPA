import { Hospital } from './../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];



  constructor(
    public activateRouter: ActivatedRoute,
    public http: HttpClient
    ) {
    activateRouter.params
    .subscribe( (params: any ) => {
      const termino = params.termino;
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
    });
  }

}
