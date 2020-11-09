
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [

  {
    /**
     * Ruta padre
     */
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    //Cargar perezosa se importa el modulo de las rutas hijas
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
