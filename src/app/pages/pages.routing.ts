
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './progress/progress.component';


const routes: Routes = [

  {
    /**
     * Ruta padre
     */
    path: 'dashboard',
    component: PagesComponent,
    children: [
      /**
       * Rutas hijas
       */
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'account-settings', component: AccountSettingsComponent },

    ]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
