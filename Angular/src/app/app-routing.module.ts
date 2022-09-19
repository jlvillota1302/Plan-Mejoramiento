import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PrincipalComponent} from './principal/principal.component';

import {DatosComponent} from './datos/datos.component';
import { IniciosComponent } from './inicios/inicios.component';
import { RegistrosComponent } from './registros/registros.component';
import { PruebaComponent } from './prueba/prueba.component';
import { ActividadesComponent } from './actividades/actividades.component';

const routes: Routes = [

  {
    path: 'administrador',
    component: PruebaComponent 
  },
  {
    path: 'registro',
    component: RegistrosComponent 
  },
  {
    path: 'inicio',
    component: IniciosComponent 
  },
  {
    path: 'home',
    component: HomeComponent 
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'principal',
    component: ActividadesComponent
  },
  
  {
    path: 'datos/:id',
    component: RegistrosComponent
  },
  {
    path: '',
    component: IniciosComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
