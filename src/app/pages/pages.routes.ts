import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
// Guards
import { LoginGuardGuard, AdminGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ VerificaTokenGuard ],
    data: { titulo: 'Dashboard'}
  },
  { path: 'progress', component: ProgessComponent, data: { titulo: 'Progress'} },
  { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas'} },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },

  // Mantenimientos
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ AdminGuard ],
    data: { titulo: 'Mantenimiento de usuarios'}
  },

  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médicos'} },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
