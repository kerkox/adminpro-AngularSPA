import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public location: Location
  ) {

  }

  canActivate() {

    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      console.log( 'Bloqueado por el ADMIN GUARD ');
      // this._usuarioService.logout();
      // this.router.navigate(['/']);
      this.location.back();
      return false;
    }
  }

}
