import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RxjsComponent } from './rxjs/rxjs.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MedicoComponent } from './mantenientos/medicos/medico/medico.component';
import { MedicosComponent } from './mantenientos/medicos/medicos.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from './../guards/admin.guard';

const childRoutes: Routes = [
  /**
     * Rutas hijas
     */
  { path: '', component: DashboardComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: 'buscar/:termino', component: BusquedasComponent, data: { titulo: 'Busqueda' } },
  { path: 'grafica1', component: Grafica1Component },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
  { path: 'progress', component: ProgressComponent },
  { path: 'promesas', component: PromesasComponent },
  { path: 'rxjs', component: RxjsComponent },

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de la aplicación' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de medicos' } },
  //Rutas Admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios de la aplicación' } },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
