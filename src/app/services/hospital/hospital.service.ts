import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
  ) {
  }


  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url).pipe(map( (resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map( (resp: any)  => resp.hospital));
  }

  borrarHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Hospital borrado', 'El Hospital ha sido eliminado correctamente', 'success');
      return true;
    }));
  }

  crearHospital( nombre: string ) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre }).pipe(map((resp: any) => {
      swal('Hospital creado', nombre, 'success');
      return resp.hospital;
    }));
  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return resp.hospital;
      }));
  }
}
