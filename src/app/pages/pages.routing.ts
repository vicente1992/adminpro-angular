
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [

  {
    /**
     * Ruta padre
     */
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      /**
       * Rutas hijas
       */
      { path: '', component: DashboardComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
      { path: 'progress', component: ProgressComponent },
      { path: 'promesas', component: PromesasComponent },
      { path: 'rxjs', component: RxjsComponent },

    ]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
