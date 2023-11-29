import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllComponent } from './all/all.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuarios',
    },
    children: [
      {
        path: 'all',
        component: AllComponent,
        data: {
          title: 'usuarios Page',
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'usuarios/all',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
