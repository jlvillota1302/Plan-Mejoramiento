import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DatosComponent } from './datos/datos.component';
import { PruebaComponent } from './prueba/prueba.component';
import { IniciosComponent } from './inicios/inicios.component';
import { RegistrosComponent } from './registros/registros.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ImageUploadModule } from 'angular2-image-upload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PrincipalComponent,
    
    DatosComponent,
         PruebaComponent,
         IniciosComponent,
         RegistrosComponent,
         ActividadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    ImageUploadModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
