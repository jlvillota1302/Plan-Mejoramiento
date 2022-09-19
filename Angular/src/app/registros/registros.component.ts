import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import {ServiceService} from '../services/service.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit {
  seleccionado;
  selected;
  public users=[] as any;
  public current = 1;
  public current_fs: any;
  public next_fs: any;
  public opacity: any;
  public valor = 1;
  public condicion = "";
  public nextinput=0;
  dropdownList: any;
  dropdownSettings: any;
  opcionSeleccionado:number=0;
  files: File[] = [];
  images;
  public departamentos = [
    { DepCodigo: 1, DepNombre: 'Antioquia' },
    { DepCodigo: 2, DepNombre: 'Atlantico' },
    { DepCodigo: 3, DepNombre: 'D. C. Santa Fe de Bogotá' },
    { DepCodigo: 4, DepNombre: 'Bolivar' },
    { DepCodigo: 5, DepNombre: 'Boyaca' },
    { DepCodigo: 6, DepNombre: 'Caldas' },
    { DepCodigo: 7, DepNombre: 'Caqueta' },
    { DepCodigo: 8, DepNombre: 'Cauca' },
    { DepCodigo: 9, DepNombre: 'Cesar' },
    { DepCodigo: 10, DepNombre: 'Cordova' },
    { DepCodigo: 11, DepNombre: 'Cundinamarca' },
    { DepCodigo: 12, DepNombre: 'Choco' },
    { DepCodigo: 13, DepNombre: 'Huila' },
    { DepCodigo: 14, DepNombre: 'La Guajira' },
    { DepCodigo: 15, DepNombre: 'Magdalena' },
    { DepCodigo: 16, DepNombre: 'Meta' },
    { DepCodigo: 17, DepNombre: 'Nariño' },
    { DepCodigo: 18, DepNombre: 'Norte de Santander' },
    { DepCodigo: 19, DepNombre: 'Quindio' },
    { DepCodigo: 20, DepNombre: 'Risaralda' },
    { DepCodigo: 21, DepNombre: 'Santander' },
    { DepCodigo: 22, DepNombre: 'Sucre' },
    { DepCodigo: 23, DepNombre: 'Tolima' },
    { DepCodigo: 24, DepNombre: 'Valle' },
    { DepCodigo: 25, DepNombre: 'Arauca' },
    { DepCodigo: 26, DepNombre: 'Casanare' },
    { DepCodigo: 27, DepNombre: 'Putumayo' },
    { DepCodigo: 28, DepNombre: 'San Andres' },
    { DepCodigo: 29, DepNombre: 'Amazonas' },
    { DepCodigo: 30, DepNombre: 'Guainia' },
    { DepCodigo: 31, DepNombre: 'Guaviare' },
    { DepCodigo: 32, DepNombre: 'Vaupes' },
    { DepCodigo: 33, DepNombre: 'Vichada' }
  ];

  public ciudades = [{ CiuCodigo: 1, CiuNombre: 'MEDELLIN' },
  { CiuCodigo: 1, CiuNombre: 'ABEJORRAL' },
  { CiuCodigo: 1, CiuNombre: 'ABRIAQUI' },
  { CiuCodigo: 1, CiuNombre: 'ALEJANDRIA' },
  { CiuCodigo: 1, CiuNombre: 'AMAGA' },
  { CiuCodigo: 1, CiuNombre: 'AMALFI' },
  { CiuCodigo: 1, CiuNombre: 'ANDES' },
  { CiuCodigo: 1, CiuNombre: 'ANGELOPOLIS' },
  { CiuCodigo: 1, CiuNombre: 'ANGOSTURA' },
  { CiuCodigo: 1, CiuNombre: 'ANORI' },
  { CiuCodigo: 1, CiuNombre: 'ANTIOQUIA' },
  { CiuCodigo: 1, CiuNombre: 'ANZA' },
  { CiuCodigo: 1, CiuNombre: 'APARTADO' },
  { CiuCodigo: 1, CiuNombre: 'ARBOLETES' },
  { CiuCodigo: 1, CiuNombre: 'ARGELIA' },
  { CiuCodigo: 1, CiuNombre: 'ARMENIA' },
  { CiuCodigo: 1, CiuNombre: 'BARBOSA' },
  { CiuCodigo: 1, CiuNombre: 'BELMIRA' },
  { CiuCodigo: 1, CiuNombre: 'BELLO' },
  { CiuCodigo: 1, CiuNombre: 'BETANIA' },
  { CiuCodigo: 1, CiuNombre: 'BETULIA' },
  { CiuCodigo: 1, CiuNombre: 'BOLIVAR' },
  { CiuCodigo: 1, CiuNombre: 'BRICEÑO' },
  { CiuCodigo: 1, CiuNombre: 'BURITICA' },
  { CiuCodigo: 1, CiuNombre: 'CACERES' },
  { CiuCodigo: 1, CiuNombre: 'CAICEDO' },
  { CiuCodigo: 1, CiuNombre: 'CALDAS' },
  { CiuCodigo: 1, CiuNombre: 'CAMPAMENTO' },
  { CiuCodigo: 1, CiuNombre: 'CAÑASGORDAS' },
  { CiuCodigo: 1, CiuNombre: 'CARACOLI' },
  { CiuCodigo: 1, CiuNombre: 'CARAMANTA' },
  { CiuCodigo: 1, CiuNombre: 'CAREPA' },
  { CiuCodigo: 1, CiuNombre: 'CARMEN DE VIBORAL' },
  { CiuCodigo: 1, CiuNombre: 'CAROLINA' },
  { CiuCodigo: 1, CiuNombre: 'CAUCASIA' },
  { CiuCodigo: 1, CiuNombre: 'CHIGORODO' },
  { CiuCodigo: 1, CiuNombre: 'CISNEROS' },
  { CiuCodigo: 1, CiuNombre: 'COCORNA' },
  { CiuCodigo: 1, CiuNombre: 'CONCEPCION' },
  { CiuCodigo: 1, CiuNombre: 'CONCORDIA' },
  { CiuCodigo: 1, CiuNombre: 'COPACABANA' },
  { CiuCodigo: 1, CiuNombre: 'DABEIBA' },
  { CiuCodigo: 1, CiuNombre: 'DON MATIAS' },
  { CiuCodigo: 1, CiuNombre: 'EBEJICO' },
  { CiuCodigo: 1, CiuNombre: 'EL BAGRE' },
  { CiuCodigo: 1, CiuNombre: 'ENTRERRIOS' },
  { CiuCodigo: 1, CiuNombre: 'ENVIGADO' },
  { CiuCodigo: 1, CiuNombre: 'FREDONIA' },
  { CiuCodigo: 1, CiuNombre: 'FRONTINO' },
  { CiuCodigo: 1, CiuNombre: 'GIRALDO' },
  { CiuCodigo: 1, CiuNombre: 'GIRARDOTA' },
  { CiuCodigo: 1, CiuNombre: 'GOMEZ PLATA' },
  { CiuCodigo: 1, CiuNombre: 'GRANADA' },
  { CiuCodigo: 1, CiuNombre: 'GUADALUPE' },
  { CiuCodigo: 1, CiuNombre: 'GUARNE' },
  { CiuCodigo: 1, CiuNombre: 'GUATAPE' },
  { CiuCodigo: 1, CiuNombre: 'HELICONIA' },
  { CiuCodigo: 1, CiuNombre: 'HISPANIA' },
  { CiuCodigo: 1, CiuNombre: 'ITAGUI' },
  { CiuCodigo: 1, CiuNombre: 'ITUANGO' },
  { CiuCodigo: 1, CiuNombre: 'JARDIN' },
  { CiuCodigo: 1, CiuNombre: 'JERICO' },
  { CiuCodigo: 1, CiuNombre: 'LA CEJA' },
  { CiuCodigo: 1, CiuNombre: 'LA ESTRELLA' },
  { CiuCodigo: 1, CiuNombre: 'LA PINTADA' },
  { CiuCodigo: 1, CiuNombre: 'LA UNION' },
  { CiuCodigo: 1, CiuNombre: 'LIBORINA' },
  { CiuCodigo: 1, CiuNombre: 'MACEO' },
  { CiuCodigo: 1, CiuNombre: 'MARINILLA' },
  { CiuCodigo: 1, CiuNombre: 'MONTEBELLO' },
  { CiuCodigo: 1, CiuNombre: 'MURINDO' },
  { CiuCodigo: 1, CiuNombre: 'MUTATA' },
  { CiuCodigo: 1, CiuNombre: 'NARIÑO' },
  { CiuCodigo: 1, CiuNombre: 'NECOCLI' },
  { CiuCodigo: 1, CiuNombre: 'NECHI' },
  { CiuCodigo: 1, CiuNombre: 'OLAYA' },
  { CiuCodigo: 1, CiuNombre: 'PEÑOL' },
  { CiuCodigo: 1, CiuNombre: 'PEQUE' },
  { CiuCodigo: 1, CiuNombre: 'PUEBLORRICO' },
  { CiuCodigo: 1, CiuNombre: 'PUERTO BERRIO' },
  { CiuCodigo: 1, CiuNombre: 'PUERTO NARE (LA MAGDALENA)' },
  { CiuCodigo: 1, CiuNombre: 'PUERTO TRIUNFO' },
  { CiuCodigo: 1, CiuNombre: 'REMEDIOS' },
  { CiuCodigo: 1, CiuNombre: 'RETIRO' },
  { CiuCodigo: 1, CiuNombre: 'RIONEGRO' },
  { CiuCodigo: 1, CiuNombre: 'SABANALARGA' },
  { CiuCodigo: 1, CiuNombre: 'SABANETA' },
  { CiuCodigo: 1, CiuNombre: 'SALGAR' },
  { CiuCodigo: 1, CiuNombre: 'SAN ANDRES' },
  { CiuCodigo: 1, CiuNombre: 'SAN CARLOS' },
  { CiuCodigo: 1, CiuNombre: 'SAN FRANCISCO' },
  { CiuCodigo: 1, CiuNombre: 'SAN JERONIMO' },
  { CiuCodigo: 1, CiuNombre: 'SAN JOSE DE LA MONTAÑA' },
  { CiuCodigo: 1, CiuNombre: 'SAN JUAN DE URABA' },
  { CiuCodigo: 1, CiuNombre: 'SAN LUIS' },
  { CiuCodigo: 1, CiuNombre: 'SAN PEDRO' },
  { CiuCodigo: 1, CiuNombre: 'SAN PEDRO DE URABA' },
  { CiuCodigo: 1, CiuNombre: 'SAN RAFAEL' },
  { CiuCodigo: 1, CiuNombre: 'SAN ROQUE' },
  { CiuCodigo: 1, CiuNombre: 'SAN VICENTE' },
  { CiuCodigo: 1, CiuNombre: 'SANTA BARBARA' },
  { CiuCodigo: 1, CiuNombre: 'SANTA ROSA DE OSOS' },
  { CiuCodigo: 1, CiuNombre: 'SANTO DOMINGO' },
  { CiuCodigo: 1, CiuNombre: 'SANTUARIO' },
  { CiuCodigo: 1, CiuNombre: 'SEGOVIA' },
  { CiuCodigo: 1, CiuNombre: 'SONSON' },
  { CiuCodigo: 1, CiuNombre: 'SOPETRAN' },
  { CiuCodigo: 1, CiuNombre: 'TAMESIS' },
  { CiuCodigo: 1, CiuNombre: 'TARAZA' },
  { CiuCodigo: 1, CiuNombre: 'TARSO' },
  { CiuCodigo: 1, CiuNombre: 'TITIRIBI' },
  { CiuCodigo: 1, CiuNombre: 'TOLEDO' },
  { CiuCodigo: 1, CiuNombre: 'TURBO' },
  { CiuCodigo: 1, CiuNombre: 'URAMITA' },
  { CiuCodigo: 1, CiuNombre: 'URRAO' },
  { CiuCodigo: 1, CiuNombre: 'VALDIVIA' },
  { CiuCodigo: 1, CiuNombre: 'VALPARAISO' },
  { CiuCodigo: 1, CiuNombre: 'VEGACHI' },
  { CiuCodigo: 1, CiuNombre: 'VENECIA' },
  { CiuCodigo: 1, CiuNombre: 'VIGIA DEL FUERTE' },
  { CiuCodigo: 1, CiuNombre: 'YALI' },
  { CiuCodigo: 1, CiuNombre: 'YARUMAL' },
  { CiuCodigo: 1, CiuNombre: 'YOLOMBO' },
  { CiuCodigo: 1, CiuNombre: 'YONDO' },
  { CiuCodigo: 1, CiuNombre: 'ZARAGOZA' },
  { CiuCodigo: 2, CiuNombre: 'BARRANQUILLA (DISTRITO ESPECIAL INDUSTRIAL Y PORTUARIO DE BARRANQUILLA)' },
  { CiuCodigo: 2, CiuNombre: 'BARANOA' },
  { CiuCodigo: 2, CiuNombre: 'CAMPO DE LA CRUZ' },
  { CiuCodigo: 2, CiuNombre: 'CANDELARIA' },
  { CiuCodigo: 2, CiuNombre: 'GALAPA' },
  { CiuCodigo: 2, CiuNombre: 'JUAN DE ACOSTA' },
  { CiuCodigo: 2, CiuNombre: 'LURUACO' },
  { CiuCodigo: 2, CiuNombre: 'MALAMBO' },
  { CiuCodigo: 2, CiuNombre: 'MANATI' },
  { CiuCodigo: 2, CiuNombre: 'PALMAR DE VARELA' },
  { CiuCodigo: 2, CiuNombre: 'PIOJO' },
  { CiuCodigo: 2, CiuNombre: 'POLO NUEVO' },
  { CiuCodigo: 2, CiuNombre: 'PONEDERA' },
  { CiuCodigo: 2, CiuNombre: 'PUERTO COLOMBIA' },
  { CiuCodigo: 2, CiuNombre: 'REPELON' },
  { CiuCodigo: 2, CiuNombre: 'SABANAGRANDE' },
  { CiuCodigo: 2, CiuNombre: 'SABANALARGA' },
  { CiuCodigo: 2, CiuNombre: 'SANTA LUCIA' },
  { CiuCodigo: 2, CiuNombre: 'SANTO TOMAS' },
  { CiuCodigo: 2, CiuNombre: 'SOLEDAD' },
  { CiuCodigo: 2, CiuNombre: 'SUAN' },
  { CiuCodigo: 2, CiuNombre: 'TUBARA' },
  { CiuCodigo: 2, CiuNombre: 'USIACURI' },
  { CiuCodigo: 3, CiuNombre: 'Santa Fe de Bogotá' },
  { CiuCodigo: 3, CiuNombre: 'USAQUEN' },
  { CiuCodigo: 3, CiuNombre: 'CHAPINERO' },
  { CiuCodigo: 3, CiuNombre: 'SANTA FE' },
  { CiuCodigo: 3, CiuNombre: 'SAN CRISTOBAL' },
  { CiuCodigo: 3, CiuNombre: 'USME' },
  { CiuCodigo: 3, CiuNombre: 'TUNJUELITO' },
  { CiuCodigo: 3, CiuNombre: 'BOSA' },
  { CiuCodigo: 3, CiuNombre: 'KENNEDY' },
  { CiuCodigo: 3, CiuNombre: 'FONTIBON' },
  { CiuCodigo: 3, CiuNombre: 'ENGATIVA' },
  { CiuCodigo: 3, CiuNombre: 'SUBA' },
  { CiuCodigo: 3, CiuNombre: 'BARRIOS UNIDOS' },
  { CiuCodigo: 3, CiuNombre: 'TEUSAQUILLO' },
  { CiuCodigo: 3, CiuNombre: 'MARTIRES' },
  { CiuCodigo: 3, CiuNombre: 'ANTONIO NARIÑO' },
  { CiuCodigo: 3, CiuNombre: 'PUENTE ARANDA' },
  { CiuCodigo: 3, CiuNombre: 'CANDELARIA' },
  { CiuCodigo: 3, CiuNombre: 'RAFAEL URIBE' },
  { CiuCodigo: 3, CiuNombre: 'CIUDAD BOLIVAR' },
  { CiuCodigo: 3, CiuNombre: 'SUMAPAZ' },
  { CiuCodigo: 4, CiuNombre: 'CARTAGENA (DISTRITO TURISTICO Y CULTURAL DE CARTAGENA)' },
  { CiuCodigo: 4, CiuNombre: 'ACHI' },
  { CiuCodigo: 4, CiuNombre: 'ALTOS DEL ROSARIO' },
  { CiuCodigo: 4, CiuNombre: 'ARENAL' },
  { CiuCodigo: 4, CiuNombre: 'ARJONA' },
  { CiuCodigo: 4, CiuNombre: 'ARROYOHONDO' },
  { CiuCodigo: 4, CiuNombre: 'BARRANCO DE LOBA' },
  { CiuCodigo: 4, CiuNombre: 'CALAMAR' },
  { CiuCodigo: 4, CiuNombre: 'CANTAGALLO' },
  { CiuCodigo: 4, CiuNombre: 'CICUCO' },
  { CiuCodigo: 4, CiuNombre: 'CORDOBA' },
  { CiuCodigo: 4, CiuNombre: 'CLEMENCIA' },
  { CiuCodigo: 4, CiuNombre: 'EL CARMEN DE BOLIVAR' },
  { CiuCodigo: 4, CiuNombre: 'EL GUAMO' },
  { CiuCodigo: 4, CiuNombre: 'EL PEÑON' },
  { CiuCodigo: 4, CiuNombre: 'HATILLO DE LOBA' },
  { CiuCodigo: 4, CiuNombre: 'MAGANGUE' },
  { CiuCodigo: 4, CiuNombre: 'MAHATES' },
  { CiuCodigo: 4, CiuNombre: 'MARGARITA' },
  { CiuCodigo: 4, CiuNombre: 'MARIA LA BAJA' },
  { CiuCodigo: 4, CiuNombre: 'MONTECRISTO' },
  { CiuCodigo: 4, CiuNombre: 'MOMPOS' },
  { CiuCodigo: 4, CiuNombre: 'MORALES' },
  { CiuCodigo: 4, CiuNombre: 'PINILLOS' },
  { CiuCodigo: 4, CiuNombre: 'REGIDOR' },
  { CiuCodigo: 4, CiuNombre: 'RIO VIEJO' },
  { CiuCodigo: 4, CiuNombre: 'SAN CRISTOBAL' },
  { CiuCodigo: 4, CiuNombre: 'SAN ESTANISLAO' },
  { CiuCodigo: 4, CiuNombre: 'SAN FERNANDO' },
  { CiuCodigo: 4, CiuNombre: 'SAN JACINTO' },
  { CiuCodigo: 4, CiuNombre: 'SAN JACINTO DEL CAUCA' },
  { CiuCodigo: 4, CiuNombre: 'SAN JUAN NEPOMUCENO' },
  { CiuCodigo: 4, CiuNombre: 'SAN MARTIN DE LOBA' },
  { CiuCodigo: 4, CiuNombre: 'SAN PABLO' },
  { CiuCodigo: 4, CiuNombre: 'SANTA CATALINA' },
  { CiuCodigo: 4, CiuNombre: 'SANTA ROSA' },
  { CiuCodigo: 4, CiuNombre: 'SANTA ROSA DEL SUR' },
  { CiuCodigo: 4, CiuNombre: 'SIMITI' },
  { CiuCodigo: 4, CiuNombre: 'SOPLAVIENTO' },
  { CiuCodigo: 4, CiuNombre: 'TALAIGUA NUEVO' },
  { CiuCodigo: 4, CiuNombre: 'TIQUISIO (PUERTO RICO)' },
  { CiuCodigo: 4, CiuNombre: 'TURBACO' },
  { CiuCodigo: 4, CiuNombre: 'TURBANA' },
  { CiuCodigo: 4, CiuNombre: 'VILLANUEVA' },
  { CiuCodigo: 4, CiuNombre: 'ZAMBRANO' },
  { CiuCodigo: 5, CiuNombre: 'TUNJA' },
  { CiuCodigo: 5, CiuNombre: 'ALMEIDA' },
  { CiuCodigo: 5, CiuNombre: 'AQUITANIA' },
  { CiuCodigo: 5, CiuNombre: 'ARCABUCO' },
  { CiuCodigo: 5, CiuNombre: 'BELEN' },
  { CiuCodigo: 5, CiuNombre: 'BERBEO' },
  { CiuCodigo: 5, CiuNombre: 'BETEITIVA' },
  { CiuCodigo: 5, CiuNombre: 'BOAVITA' },
  { CiuCodigo: 5, CiuNombre: 'BOYACA' },
  { CiuCodigo: 5, CiuNombre: 'BRICEÑO' },
  { CiuCodigo: 5, CiuNombre: 'BUENAVISTA' },
  { CiuCodigo: 5, CiuNombre: 'BUSBANZA' },
  { CiuCodigo: 5, CiuNombre: 'CALDAS' },
  { CiuCodigo: 5, CiuNombre: 'CAMPOHERMOSO' },
  { CiuCodigo: 5, CiuNombre: 'CERINZA' },
  { CiuCodigo: 5, CiuNombre: 'CHINAVITA' },
  { CiuCodigo: 5, CiuNombre: 'CHIQUINQUIRA' },
  { CiuCodigo: 5, CiuNombre: 'CHISCAS' },
  { CiuCodigo: 5, CiuNombre: 'CHITA' },
  { CiuCodigo: 5, CiuNombre: 'CHITARAQUE' },
  { CiuCodigo: 5, CiuNombre: 'CHIVATA' },
  { CiuCodigo: 5, CiuNombre: 'CIENEGA' },
  { CiuCodigo: 5, CiuNombre: 'COMBITA' },
  { CiuCodigo: 5, CiuNombre: 'COPER' },
  { CiuCodigo: 5, CiuNombre: 'CORRALES' },
  { CiuCodigo: 5, CiuNombre: 'COVARACHIA' },
  { CiuCodigo: 5, CiuNombre: 'CUBARA' },
  { CiuCodigo: 5, CiuNombre: 'CUCAITA' },
  { CiuCodigo: 5, CiuNombre: 'CUITIVA' },
  { CiuCodigo: 5, CiuNombre: 'CHIQUIZA' },
  { CiuCodigo: 5, CiuNombre: 'CHIVOR' },
  { CiuCodigo: 5, CiuNombre: 'DUITAMA' },
  { CiuCodigo: 5, CiuNombre: 'EL COCUY' },
  { CiuCodigo: 5, CiuNombre: 'EL ESPINO' },
  { CiuCodigo: 5, CiuNombre: 'FIRAVITOBA' },
  { CiuCodigo: 5, CiuNombre: 'FLORESTA' },
  { CiuCodigo: 5, CiuNombre: 'GACHANTIVA' },
  { CiuCodigo: 5, CiuNombre: 'GAMEZA' },
  { CiuCodigo: 5, CiuNombre: 'GARAGOA' },
  { CiuCodigo: 5, CiuNombre: 'GUACAMAYAS' },
  { CiuCodigo: 5, CiuNombre: 'GUATEQUE' },
  { CiuCodigo: 5, CiuNombre: 'GUAYATA' },
  { CiuCodigo: 5, CiuNombre: 'GUICAN' },
  { CiuCodigo: 5, CiuNombre: 'IZA' },
  { CiuCodigo: 5, CiuNombre: 'JENESANO' },
  { CiuCodigo: 5, CiuNombre: 'JERICO' },
  { CiuCodigo: 5, CiuNombre: 'LABRANZAGRANDE' },
  { CiuCodigo: 5, CiuNombre: 'LA CAPILLA' },
  { CiuCodigo: 5, CiuNombre: 'LA VICTORIA' },
  { CiuCodigo: 5, CiuNombre: 'LA UVITA' },
  { CiuCodigo: 5, CiuNombre: 'VILLA DE LEIVA' },
  { CiuCodigo: 5, CiuNombre: 'MACANAL' },
  { CiuCodigo: 5, CiuNombre: 'MARIPI' },
  { CiuCodigo: 5, CiuNombre: 'MIRAFLORES' },
  { CiuCodigo: 5, CiuNombre: 'MONGUA' },
  { CiuCodigo: 5, CiuNombre: 'MONGUI' },
  { CiuCodigo: 5, CiuNombre: 'MONIQUIRA' },
  { CiuCodigo: 5, CiuNombre: 'MOTAVITA' },
  { CiuCodigo: 5, CiuNombre: 'MUZO' },
  { CiuCodigo: 5, CiuNombre: 'NOBSA' },
  { CiuCodigo: 5, CiuNombre: 'NUEVO COLON' },
  { CiuCodigo: 5, CiuNombre: 'OICATA' },
  { CiuCodigo: 5, CiuNombre: 'OTANCHE' },
  { CiuCodigo: 5, CiuNombre: 'PACHAVITA' },
  { CiuCodigo: 5, CiuNombre: 'PAEZ' },
  { CiuCodigo: 5, CiuNombre: 'PAIPA' },
  { CiuCodigo: 5, CiuNombre: 'PAJARITO' },
  { CiuCodigo: 5, CiuNombre: 'PANQUEBA' },
  { CiuCodigo: 5, CiuNombre: 'PAUNA' },
  { CiuCodigo: 5, CiuNombre: 'PAYA' },
  { CiuCodigo: 5, CiuNombre: 'PAZ DEL RIO' },
  { CiuCodigo: 5, CiuNombre: 'PESCA' },
  { CiuCodigo: 5, CiuNombre: 'PISBA' },
  { CiuCodigo: 5, CiuNombre: 'PUERTO BOYACA' },
  { CiuCodigo: 5, CiuNombre: 'QUIPAMA' },
  { CiuCodigo: 5, CiuNombre: 'RAMIRIQUI' },
  { CiuCodigo: 5, CiuNombre: 'RAQUIRA' },
  { CiuCodigo: 5, CiuNombre: 'RONDON' },
  { CiuCodigo: 5, CiuNombre: 'SABOYA' },
  { CiuCodigo: 5, CiuNombre: 'SACHICA' },
  { CiuCodigo: 5, CiuNombre: 'SAMACA' },
  { CiuCodigo: 5, CiuNombre: 'SAN EDUARDO' },
  { CiuCodigo: 5, CiuNombre: 'SAN JOSE DE PARE' },
  { CiuCodigo: 5, CiuNombre: 'SAN LUIS DE GACENO' },
  { CiuCodigo: 5, CiuNombre: 'SAN MATEO' },
  { CiuCodigo: 5, CiuNombre: 'SAN MIGUEL DE SEMA' },
  { CiuCodigo: 5, CiuNombre: 'SAN PABLO DE BORBUR' },
  { CiuCodigo: 5, CiuNombre: 'SANTANA' },
  { CiuCodigo: 5, CiuNombre: 'SANTA MARIA' },
  { CiuCodigo: 5, CiuNombre: 'SANTA ROSA DE VITERBO' },
  { CiuCodigo: 5, CiuNombre: 'SANTA SOFIA' },
  { CiuCodigo: 5, CiuNombre: 'SATIVANORTE' },
  { CiuCodigo: 5, CiuNombre: 'SATIVASUR' },
  { CiuCodigo: 5, CiuNombre: 'SIACHOQUE' },
  { CiuCodigo: 5, CiuNombre: 'SOATA' },
  { CiuCodigo: 5, CiuNombre: 'SOCOTA' },
  { CiuCodigo: 5, CiuNombre: 'SOCHA' },
  { CiuCodigo: 5, CiuNombre: 'SOGAMOSO' },
  { CiuCodigo: 5, CiuNombre: 'SOMONDOCO' },
  { CiuCodigo: 5, CiuNombre: 'SORA' },
  { CiuCodigo: 5, CiuNombre: 'SOTAQUIRA' },
  { CiuCodigo: 5, CiuNombre: 'SORACA' },
  { CiuCodigo: 5, CiuNombre: 'SUSACON' },
  { CiuCodigo: 5, CiuNombre: 'SUTAMARCHAN' },
  { CiuCodigo: 5, CiuNombre: 'SUTATENZA' },
  { CiuCodigo: 5, CiuNombre: 'TASCO' },
  { CiuCodigo: 5, CiuNombre: 'TENZA' },
  { CiuCodigo: 5, CiuNombre: 'TIBANA' },
  { CiuCodigo: 5, CiuNombre: 'TIBASOSA' },
  { CiuCodigo: 5, CiuNombre: 'TINJACA' },
  { CiuCodigo: 5, CiuNombre: 'TIPACOQUE' },
  { CiuCodigo: 5, CiuNombre: 'TOCA' },
  { CiuCodigo: 5, CiuNombre: 'TOGUI' },
  { CiuCodigo: 5, CiuNombre: 'TOPAGA' },
  { CiuCodigo: 5, CiuNombre: 'TOTA' },
  { CiuCodigo: 5, CiuNombre: 'TUNUNGUA' },
  { CiuCodigo: 5, CiuNombre: 'TURMEQUE' },
  { CiuCodigo: 5, CiuNombre: 'TUTA' },
  { CiuCodigo: 5, CiuNombre: 'TUTASA' },
  { CiuCodigo: 5, CiuNombre: 'UMBITA' },
  { CiuCodigo: 5, CiuNombre: 'VENTAQUEMADA' },
  { CiuCodigo: 5, CiuNombre: 'VIRACACHA' },
  { CiuCodigo: 5, CiuNombre: 'ZETAQUIRA' },
  { CiuCodigo: 6, CiuNombre: 'MANIZALES' },
  { CiuCodigo: 6, CiuNombre: 'AGUADAS' },
  { CiuCodigo: 6, CiuNombre: 'ANSERMA' },
  { CiuCodigo: 6, CiuNombre: 'ARANZAZU' },
  { CiuCodigo: 6, CiuNombre: 'BELALCAZAR' },
  { CiuCodigo: 6, CiuNombre: 'CHINCHINA' },
  { CiuCodigo: 6, CiuNombre: 'FILADELFIA' },
  { CiuCodigo: 6, CiuNombre: 'LA DORADA' },
  { CiuCodigo: 6, CiuNombre: 'LA MERCED' },
  { CiuCodigo: 6, CiuNombre: 'MANZANARES' },
  { CiuCodigo: 6, CiuNombre: 'MARMATO' },
  { CiuCodigo: 6, CiuNombre: 'MARQUETALIA' },
  { CiuCodigo: 6, CiuNombre: 'MARULANDA' },
  { CiuCodigo: 6, CiuNombre: 'NEIRA' },
  { CiuCodigo: 6, CiuNombre: 'NORCASIA' },
  { CiuCodigo: 6, CiuNombre: 'PACORA' },
  { CiuCodigo: 6, CiuNombre: 'PALESTINA' },
  { CiuCodigo: 6, CiuNombre: 'PENSILVANIA' },
  { CiuCodigo: 6, CiuNombre: 'RIOSUCIO' },
  { CiuCodigo: 6, CiuNombre: 'RISARALDA' },
  { CiuCodigo: 6, CiuNombre: 'SALAMINA' },
  { CiuCodigo: 6, CiuNombre: 'SAMANA' },
  { CiuCodigo: 6, CiuNombre: 'SAN JOSE' },
  { CiuCodigo: 6, CiuNombre: 'SUPIA' },
  { CiuCodigo: 6, CiuNombre: 'VICTORIA' },
  { CiuCodigo: 6, CiuNombre: 'VILLAMARIA' },
  { CiuCodigo: 6, CiuNombre: 'VITERBO' },
  { CiuCodigo: 7, CiuNombre: 'FLORENCIA' },
  { CiuCodigo: 7, CiuNombre: 'ALBANIA' },
  { CiuCodigo: 7, CiuNombre: 'BELEN DE LOS ANDAQUIES' },
  { CiuCodigo: 7, CiuNombre: 'CARTAGENA DEL CHAIRA' },
  { CiuCodigo: 7, CiuNombre: 'CURILLO' },
  { CiuCodigo: 7, CiuNombre: 'EL DONCELLO' },
  { CiuCodigo: 7, CiuNombre: 'EL PAUJIL' },
  { CiuCodigo: 7, CiuNombre: 'LA MONTAÑITA' },
  { CiuCodigo: 7, CiuNombre: 'MILAN' },
  { CiuCodigo: 7, CiuNombre: 'MORELIA' },
  { CiuCodigo: 7, CiuNombre: 'PUERTO RICO' },
  { CiuCodigo: 7, CiuNombre: 'SAN JOSE DE FRAGUA' },
  { CiuCodigo: 7, CiuNombre: 'SAN VICENTE DEL CAGUAN' },
  { CiuCodigo: 7, CiuNombre: 'SOLANO' },
  { CiuCodigo: 7, CiuNombre: 'SOLITA' },
  { CiuCodigo: 7, CiuNombre: 'VALPARAISO' },
  { CiuCodigo: 8, CiuNombre: 'POPAYAN' },
  { CiuCodigo: 8, CiuNombre: 'ALMAGUER' },
  { CiuCodigo: 8, CiuNombre: 'ARGELIA' },
  { CiuCodigo: 8, CiuNombre: 'BALBOA' },
  { CiuCodigo: 8, CiuNombre: 'BOLIVAR' },
  { CiuCodigo: 8, CiuNombre: 'BUENOS AIRES' },
  { CiuCodigo: 8, CiuNombre: 'CAJIBIO' },
  { CiuCodigo: 8, CiuNombre: 'CALDONO' },
  { CiuCodigo: 8, CiuNombre: 'CALOTO' },
  { CiuCodigo: 8, CiuNombre: 'CORINTO' },
  { CiuCodigo: 8, CiuNombre: 'EL TAMBO' },
  { CiuCodigo: 8, CiuNombre: 'FLORENCIA' },
  { CiuCodigo: 8, CiuNombre: 'GUAPI' },
  { CiuCodigo: 8, CiuNombre: 'INZA' },
  { CiuCodigo: 8, CiuNombre: 'JAMBALO' },
  { CiuCodigo: 8, CiuNombre: 'LA SIERRA' },
  { CiuCodigo: 8, CiuNombre: 'LA VEGA' },
  { CiuCodigo: 8, CiuNombre: 'LOPEZ (MICAY)' },
  { CiuCodigo: 8, CiuNombre: 'MERCADERES' },
  { CiuCodigo: 8, CiuNombre: 'MIRANDA' },
  { CiuCodigo: 8, CiuNombre: 'MORALES' },
  { CiuCodigo: 8, CiuNombre: 'PADILLA' },
  { CiuCodigo: 8, CiuNombre: 'PAEZ (BELALCAZAR)' },
  { CiuCodigo: 8, CiuNombre: 'PATIA (EL BORDO)' },
  { CiuCodigo: 8, CiuNombre: 'PIAMONTE' },
  { CiuCodigo: 8, CiuNombre: 'PIENDAMO' },
  { CiuCodigo: 8, CiuNombre: 'PUERTO TEJADA' },
  { CiuCodigo: 8, CiuNombre: 'PURACE (COCONUCO)' },
  { CiuCodigo: 8, CiuNombre: 'ROSAS' },
  { CiuCodigo: 8, CiuNombre: 'SAN SEBASTIAN' },
  { CiuCodigo: 8, CiuNombre: 'SANTANDER DE QUILICHAO' },
  { CiuCodigo: 8, CiuNombre: 'SANTA ROSA' },
  { CiuCodigo: 8, CiuNombre: 'SILVIA' },
  { CiuCodigo: 8, CiuNombre: 'SOTARA (PAISPAMBA)' },
  { CiuCodigo: 8, CiuNombre: 'SUAREZ' },
  { CiuCodigo: 8, CiuNombre: 'TIMBIO' },
  { CiuCodigo: 8, CiuNombre: 'TIMBIQUI' },
  { CiuCodigo: 8, CiuNombre: 'TORIBIO' },
  { CiuCodigo: 8, CiuNombre: 'TOTORO' },
  { CiuCodigo: 8, CiuNombre: 'VILLARICA' },
  { CiuCodigo: 9, CiuNombre: 'VALLEDUPAR' },
  { CiuCodigo: 9, CiuNombre: 'AGUACHICA' },
  { CiuCodigo: 9, CiuNombre: 'AGUSTIN CODAZZI' },
  { CiuCodigo: 9, CiuNombre: 'ASTREA' },
  { CiuCodigo: 9, CiuNombre: 'BECERRIL' },
  { CiuCodigo: 9, CiuNombre: 'BOSCONIA' },
  { CiuCodigo: 9, CiuNombre: 'CHIMICHAGUA' },
  { CiuCodigo: 9, CiuNombre: 'CHIRIGUANA' },
  { CiuCodigo: 9, CiuNombre: 'CURUMANI' },
  { CiuCodigo: 9, CiuNombre: 'EL COPEY' },
  { CiuCodigo: 9, CiuNombre: 'EL PASO' },
  { CiuCodigo: 9, CiuNombre: 'GAMARRA' },
  { CiuCodigo: 9, CiuNombre: 'GONZALEZ' },
  { CiuCodigo: 9, CiuNombre: 'LA GLORIA' },
  { CiuCodigo: 9, CiuNombre: 'LA JAGUA IBIRICO' },
  { CiuCodigo: 9, CiuNombre: 'MANAURE (BALCON DEL CESAR)' },
  { CiuCodigo: 9, CiuNombre: 'PAILITAS' },
  { CiuCodigo: 9, CiuNombre: 'PELAYA' },
  { CiuCodigo: 9, CiuNombre: 'PUEBLO BELLO' },
  { CiuCodigo: 9, CiuNombre: 'RIO DE ORO' },
  { CiuCodigo: 9, CiuNombre: 'LA PAZ (ROBLES)' },
  { CiuCodigo: 9, CiuNombre: 'SAN ALBERTO' },
  { CiuCodigo: 9, CiuNombre: 'SAN DIEGO' },
  { CiuCodigo: 9, CiuNombre: 'SAN MARTIN' },
  { CiuCodigo: 9, CiuNombre: 'TAMALAMEQUE' },
  { CiuCodigo: 10, CiuNombre: 'MONTERIA' },
  { CiuCodigo: 10, CiuNombre: 'AYAPEL' },
  { CiuCodigo: 10, CiuNombre: 'BUENAVISTA' },
  { CiuCodigo: 10, CiuNombre: 'CANALETE' },
  { CiuCodigo: 10, CiuNombre: 'CERETE' },
  { CiuCodigo: 10, CiuNombre: 'CHIMA' },
  { CiuCodigo: 10, CiuNombre: 'CHINU' },
  { CiuCodigo: 10, CiuNombre: 'CIENAGA DE ORO' },
  { CiuCodigo: 10, CiuNombre: 'COTORRA' },
  { CiuCodigo: 10, CiuNombre: 'LA APARTADA' },
  { CiuCodigo: 10, CiuNombre: 'LORICA' },
  { CiuCodigo: 10, CiuNombre: 'LOS CORDOBAS' },
  { CiuCodigo: 10, CiuNombre: 'MOMIL' },
  { CiuCodigo: 10, CiuNombre: 'MONTELIBANO' },
  { CiuCodigo: 10, CiuNombre: 'MOÑITOS' },
  { CiuCodigo: 10, CiuNombre: 'PLANETA RICA' },
  { CiuCodigo: 10, CiuNombre: 'PUEBLO NUEVO' },
  { CiuCodigo: 10, CiuNombre: 'PUERTO ESCONDIDO' },
  { CiuCodigo: 10, CiuNombre: 'PUERTO LIBERTADOR' },
  { CiuCodigo: 10, CiuNombre: 'PURISIMA' },
  { CiuCodigo: 10, CiuNombre: 'SAHAGUN' },
  { CiuCodigo: 10, CiuNombre: 'SAN ANDRES SOTAVENTO' },
  { CiuCodigo: 10, CiuNombre: 'SAN ANTERO' },
  { CiuCodigo: 10, CiuNombre: 'SAN BERNARDO DEL VIENTO' },
  { CiuCodigo: 10, CiuNombre: 'SAN CARLOS' },
  { CiuCodigo: 10, CiuNombre: 'SAN PELAYO' },
  { CiuCodigo: 10, CiuNombre: 'TIERRALTA' },
  { CiuCodigo: 10, CiuNombre: 'VALENCIA' },
  { CiuCodigo: 11, CiuNombre: 'AGUA DE DIOS' },
  { CiuCodigo: 11, CiuNombre: 'ALBAN' },
  { CiuCodigo: 11, CiuNombre: 'ANAPOIMA' },
  { CiuCodigo: 11, CiuNombre: 'ANOLAIMA' },
  { CiuCodigo: 11, CiuNombre: 'ARBELAEZ' },
  { CiuCodigo: 11, CiuNombre: 'BELTRAN' },
  { CiuCodigo: 11, CiuNombre: 'BITUIMA' },
  { CiuCodigo: 11, CiuNombre: 'BOJACA' },
  { CiuCodigo: 11, CiuNombre: 'CABRERA' },
  { CiuCodigo: 11, CiuNombre: 'CACHIPAY' },
  { CiuCodigo: 11, CiuNombre: 'CAJICA' },
  { CiuCodigo: 11, CiuNombre: 'CAPARRAPI' },
  { CiuCodigo: 11, CiuNombre: 'CAQUEZA' },
  { CiuCodigo: 11, CiuNombre: 'CARMEN DE CARUPA' },
  { CiuCodigo: 11, CiuNombre: 'CHAGUANI' },
  { CiuCodigo: 11, CiuNombre: 'CHIA' },
  { CiuCodigo: 11, CiuNombre: 'CHIPAQUE' },
  { CiuCodigo: 11, CiuNombre: 'CHOACHI' },
  { CiuCodigo: 11, CiuNombre: 'CHOCONTA' },
  { CiuCodigo: 11, CiuNombre: 'COGUA' },
  { CiuCodigo: 11, CiuNombre: 'COTA' },
  { CiuCodigo: 11, CiuNombre: 'CUCUNUBA' },
  { CiuCodigo: 11, CiuNombre: 'EL COLEGIO' },
  { CiuCodigo: 11, CiuNombre: 'EL PEÑON' },
  { CiuCodigo: 11, CiuNombre: 'EL ROSAL' },
  { CiuCodigo: 11, CiuNombre: 'FACATATIVA' },
  { CiuCodigo: 11, CiuNombre: 'FOMEQUE' },
  { CiuCodigo: 11, CiuNombre: 'FOSCA' },
  { CiuCodigo: 11, CiuNombre: 'FUNZA' },
  { CiuCodigo: 11, CiuNombre: 'FUQUENE' },
  { CiuCodigo: 11, CiuNombre: 'FUSAGASUGA' },
  { CiuCodigo: 11, CiuNombre: 'GACHALA' },
  { CiuCodigo: 11, CiuNombre: 'GACHANCIPA' },
  { CiuCodigo: 11, CiuNombre: 'GACHETA' },
  { CiuCodigo: 11, CiuNombre: 'GAMA' },
  { CiuCodigo: 11, CiuNombre: 'GIRARDOT' },
  { CiuCodigo: 11, CiuNombre: 'GRANADA' },
  { CiuCodigo: 11, CiuNombre: 'GUACHETA' },
  { CiuCodigo: 11, CiuNombre: 'GUADUAS' },
  { CiuCodigo: 11, CiuNombre: 'GUASCA' },
  { CiuCodigo: 11, CiuNombre: 'GUATAQUI' },
  { CiuCodigo: 11, CiuNombre: 'GUATAVITA' },
  { CiuCodigo: 11, CiuNombre: 'GUAYABAL DE SIQUIMA' },
  { CiuCodigo: 11, CiuNombre: 'GUAYABETAL' },
  { CiuCodigo: 11, CiuNombre: 'GUTIERREZ' },
  { CiuCodigo: 11, CiuNombre: 'JERUSALEN' },
  { CiuCodigo: 11, CiuNombre: 'JUNIN' },
  { CiuCodigo: 11, CiuNombre: 'LA CALERA' },
  { CiuCodigo: 11, CiuNombre: 'LA MESA' },
  { CiuCodigo: 11, CiuNombre: 'LA PALMA' },
  { CiuCodigo: 11, CiuNombre: 'LA PEÑA' },
  { CiuCodigo: 11, CiuNombre: 'LA VEGA' },
  { CiuCodigo: 11, CiuNombre: 'LENGUAZAQUE' },
  { CiuCodigo: 11, CiuNombre: 'MACHETA' },
  { CiuCodigo: 11, CiuNombre: 'MADRID' },
  { CiuCodigo: 11, CiuNombre: 'MANTA' },
  { CiuCodigo: 11, CiuNombre: 'MEDINA' },
  { CiuCodigo: 11, CiuNombre: 'MOSQUERA' },
  { CiuCodigo: 11, CiuNombre: 'NARIÑO' },
  { CiuCodigo: 11, CiuNombre: 'NEMOCON' },
  { CiuCodigo: 11, CiuNombre: 'NILO' },
  { CiuCodigo: 11, CiuNombre: 'NIMAIMA' },
  { CiuCodigo: 11, CiuNombre: 'NOCAIMA' },
  { CiuCodigo: 11, CiuNombre: 'VENECIA (OSPINA PEREZ)' },
  { CiuCodigo: 11, CiuNombre: 'PACHO' },
  { CiuCodigo: 11, CiuNombre: 'PAIME' },
  { CiuCodigo: 11, CiuNombre: 'PANDI' },
  { CiuCodigo: 11, CiuNombre: 'PARATEBUENO' },
  { CiuCodigo: 11, CiuNombre: 'PASCA' },
  { CiuCodigo: 11, CiuNombre: 'PUERTO SALGAR' },
  { CiuCodigo: 11, CiuNombre: 'PULI' },
  { CiuCodigo: 11, CiuNombre: 'QUEBRADANEGRA' },
  { CiuCodigo: 11, CiuNombre: 'QUETAME' },
  { CiuCodigo: 11, CiuNombre: 'QUIPILE' },
  { CiuCodigo: 11, CiuNombre: 'APULO (RAFAEL REYES)' },
  { CiuCodigo: 11, CiuNombre: 'RICAURTE' },
  { CiuCodigo: 11, CiuNombre: 'SAN ANTONIO DEL TEQUENDAMA' },
  { CiuCodigo: 11, CiuNombre: 'SAN BERNARDO' },
  { CiuCodigo: 11, CiuNombre: 'SAN CAYETANO' },
  { CiuCodigo: 11, CiuNombre: 'SAN FRANCISCO' },
  { CiuCodigo: 11, CiuNombre: 'SAN JUAN DE RIOSECO' },
  { CiuCodigo: 11, CiuNombre: 'SASAIMA' },
  { CiuCodigo: 11, CiuNombre: 'SESQUILE' },
  { CiuCodigo: 11, CiuNombre: 'SIBATE' },
  { CiuCodigo: 11, CiuNombre: 'SILVANIA' },
  { CiuCodigo: 11, CiuNombre: 'SIMIJACA' },
  { CiuCodigo: 11, CiuNombre: 'SOACHA' },
  { CiuCodigo: 11, CiuNombre: 'SOPO' },
  { CiuCodigo: 11, CiuNombre: 'SUBACHOQUE' },
  { CiuCodigo: 11, CiuNombre: 'SUESCA' },
  { CiuCodigo: 11, CiuNombre: 'SUPATA' },
  { CiuCodigo: 11, CiuNombre: 'SUSA' },
  { CiuCodigo: 11, CiuNombre: 'SUTATAUSA' },
  { CiuCodigo: 11, CiuNombre: 'TABIO' },
  { CiuCodigo: 11, CiuNombre: 'TAUSA' },
  { CiuCodigo: 11, CiuNombre: 'TENA' },
  { CiuCodigo: 11, CiuNombre: 'TENJO' },
  { CiuCodigo: 11, CiuNombre: 'TIBACUY' },
  { CiuCodigo: 11, CiuNombre: 'TIBIRITA' },
  { CiuCodigo: 11, CiuNombre: 'TOCAIMA' },
  { CiuCodigo: 11, CiuNombre: 'TOCANCIPA' },
  { CiuCodigo: 11, CiuNombre: 'TOPAIPI' },
  { CiuCodigo: 11, CiuNombre: 'UBALA' },
  { CiuCodigo: 11, CiuNombre: 'UBAQUE' },
  { CiuCodigo: 11, CiuNombre: 'UBATE' },
  { CiuCodigo: 11, CiuNombre: 'UNE' },
  { CiuCodigo: 11, CiuNombre: 'UTICA' },
  { CiuCodigo: 11, CiuNombre: 'VERGARA' },
  { CiuCodigo: 11, CiuNombre: 'VIANI' },
  { CiuCodigo: 11, CiuNombre: 'VILLAGOMEZ' },
  { CiuCodigo: 11, CiuNombre: 'VILLAPINZON' },
  { CiuCodigo: 11, CiuNombre: 'VILLETA' },
  { CiuCodigo: 11, CiuNombre: 'VIOTA' },
  { CiuCodigo: 11, CiuNombre: 'YACOPI' },
  { CiuCodigo: 11, CiuNombre: 'ZIPACON' },
  { CiuCodigo: 11, CiuNombre: 'ZIPAQUIRA' },
  { CiuCodigo: 12, CiuNombre: 'QUIBDO (SAN FRANCISCO DE QUIBDO)' },
  { CiuCodigo: 12, CiuNombre: 'ACANDI' },
  { CiuCodigo: 12, CiuNombre: 'ALTO BAUDO (PIE DE PATO)' },
  { CiuCodigo: 12, CiuNombre: 'ATRATO' },
  { CiuCodigo: 12, CiuNombre: 'BAGADO' },
  { CiuCodigo: 12, CiuNombre: 'BAHIA SOLANO (MUTIS)' },
  { CiuCodigo: 12, CiuNombre: 'BAJO BAUDO (PIZARRO)' },
  { CiuCodigo: 12, CiuNombre: 'BOJAYA (BELLAVISTA)' },
  { CiuCodigo: 12, CiuNombre: 'CANTON DE SAN PABLO (MANAGRU)' },
  { CiuCodigo: 12, CiuNombre: 'CONDOTO' },
  { CiuCodigo: 12, CiuNombre: 'EL CARMEN DE ATRATO' },
  { CiuCodigo: 12, CiuNombre: 'LITORAL DEL BAJO SAN JUAN (SANTA GENOVEVA DE DOCORDO)' },
  { CiuCodigo: 12, CiuNombre: 'ISTMINA' },
  { CiuCodigo: 12, CiuNombre: 'JURADO' },
  { CiuCodigo: 12, CiuNombre: 'LLORO' },
  { CiuCodigo: 12, CiuNombre: 'MEDIO ATRATO' },
  { CiuCodigo: 12, CiuNombre: 'MEDIO BAUDO' },
  { CiuCodigo: 12, CiuNombre: 'NOVITA' },
  { CiuCodigo: 12, CiuNombre: 'NUQUI' },
  { CiuCodigo: 12, CiuNombre: 'RIOQUITO' },
  { CiuCodigo: 12, CiuNombre: 'RIOSUCIO' },
  { CiuCodigo: 12, CiuNombre: 'SAN JOSE DEL PALMAR' },
  { CiuCodigo: 12, CiuNombre: 'SIPI' },
  { CiuCodigo: 12, CiuNombre: 'TADO' },
  { CiuCodigo: 12, CiuNombre: 'UNGUIA' },
  { CiuCodigo: 12, CiuNombre: 'UNION PANAMERICANA' },
  { CiuCodigo: 13, CiuNombre: 'NEIVA' },
  { CiuCodigo: 13, CiuNombre: 'ACEVEDO' },
  { CiuCodigo: 13, CiuNombre: 'AGRADO' },
  { CiuCodigo: 13, CiuNombre: 'AIPE' },
  { CiuCodigo: 13, CiuNombre: 'ALGECIRAS' },
  { CiuCodigo: 13, CiuNombre: 'ALTAMIRA' },
  { CiuCodigo: 13, CiuNombre: 'BARAYA' },
  { CiuCodigo: 13, CiuNombre: 'CAMPOALEGRE' },
  { CiuCodigo: 13, CiuNombre: 'COLOMBIA' },
  { CiuCodigo: 13, CiuNombre: 'ELIAS' },
  { CiuCodigo: 13, CiuNombre: 'GARZON' },
  { CiuCodigo: 13, CiuNombre: 'GIGANTE' },
  { CiuCodigo: 13, CiuNombre: 'GUADALUPE' },
  { CiuCodigo: 13, CiuNombre: 'HOBO' },
  { CiuCodigo: 13, CiuNombre: 'IQUIRA' },
  { CiuCodigo: 13, CiuNombre: 'ISNOS (SAN JOSE DE ISNOS)' },
  { CiuCodigo: 13, CiuNombre: 'LA ARGENTINA' },
  { CiuCodigo: 13, CiuNombre: 'LA PLATA' },
  { CiuCodigo: 13, CiuNombre: 'NATAGA' },
  { CiuCodigo: 13, CiuNombre: 'OPORAPA' },
  { CiuCodigo: 13, CiuNombre: 'PAICOL' },
  { CiuCodigo: 13, CiuNombre: 'PALERMO' },
  { CiuCodigo: 13, CiuNombre: 'PALESTINA' },
  { CiuCodigo: 13, CiuNombre: 'PITAL' },
  { CiuCodigo: 13, CiuNombre: 'PITALITO' },
  { CiuCodigo: 13, CiuNombre: 'RIVERA' },
  { CiuCodigo: 13, CiuNombre: 'SALADOBLANCO' },
  { CiuCodigo: 13, CiuNombre: 'SAN AGUSTIN' },
  { CiuCodigo: 13, CiuNombre: 'SANTA MARIA' },
  { CiuCodigo: 13, CiuNombre: 'SUAZA' },
  { CiuCodigo: 13, CiuNombre: 'TARQUI' },
  { CiuCodigo: 13, CiuNombre: 'TESALIA' },
  { CiuCodigo: 13, CiuNombre: 'TELLO' },
  { CiuCodigo: 13, CiuNombre: 'TERUEL' },
  { CiuCodigo: 13, CiuNombre: 'TIMANA' },
  { CiuCodigo: 13, CiuNombre: 'VILLAVIEJA' },
  { CiuCodigo: 13, CiuNombre: 'YAGUARA' },
  { CiuCodigo: 14, CiuNombre: 'RIOHACHA' },
  { CiuCodigo: 14, CiuNombre: 'BARRANCAS' },
  { CiuCodigo: 14, CiuNombre: 'DIBULLA' },
  { CiuCodigo: 14, CiuNombre: 'DISTRACCION' },
  { CiuCodigo: 14, CiuNombre: 'EL MOLINO' },
  { CiuCodigo: 14, CiuNombre: 'FONSECA' },
  { CiuCodigo: 14, CiuNombre: 'HATONUEVO' },
  { CiuCodigo: 14, CiuNombre: 'LA JAGUA DEL PILAR' },
  { CiuCodigo: 14, CiuNombre: 'MAICAO' },
  { CiuCodigo: 14, CiuNombre: 'MANAURE' },
  { CiuCodigo: 14, CiuNombre: 'SAN JUAN DEL CESAR' },
  { CiuCodigo: 14, CiuNombre: 'URIBIA' },
  { CiuCodigo: 14, CiuNombre: 'URUMITA' },
  { CiuCodigo: 14, CiuNombre: 'VILLANUEVA' },
  { CiuCodigo: 15, CiuNombre: 'SANTA MARTA (DISTRITO TURISTICO CULTURAL E HISTORICO DE SANTA MARTA)' },
  { CiuCodigo: 15, CiuNombre: 'ALGARROBO' },
  { CiuCodigo: 15, CiuNombre: 'ARACATACA' },
  { CiuCodigo: 15, CiuNombre: 'ARIGUANI (EL DIFICIL)' },
  { CiuCodigo: 15, CiuNombre: 'CERRO SAN ANTONIO' },
  { CiuCodigo: 15, CiuNombre: 'CHIVOLO' },
  { CiuCodigo: 15, CiuNombre: 'CIENAGA' },
  { CiuCodigo: 15, CiuNombre: 'CONCORDIA' },
  { CiuCodigo: 15, CiuNombre: 'EL BANCO' },
  { CiuCodigo: 15, CiuNombre: 'EL PIÑON' },
  { CiuCodigo: 15, CiuNombre: 'EL RETEN' },
  { CiuCodigo: 15, CiuNombre: 'FUNDACION' },
  { CiuCodigo: 15, CiuNombre: 'GUAMAL' },
  { CiuCodigo: 15, CiuNombre: 'PEDRAZA' },
  { CiuCodigo: 15, CiuNombre: 'PIJIÑO DEL CARMEN (PIJIÑO)' },
  { CiuCodigo: 15, CiuNombre: 'PIVIJAY' },
  { CiuCodigo: 15, CiuNombre: 'PLATO' },
  { CiuCodigo: 15, CiuNombre: 'PUEBLOVIEJO' },
  { CiuCodigo: 15, CiuNombre: 'REMOLINO' },
  { CiuCodigo: 15, CiuNombre: 'SABANAS DE SAN ANGEL' },
  { CiuCodigo: 15, CiuNombre: 'SALAMINA' },
  { CiuCodigo: 15, CiuNombre: 'SAN SEBASTIAN DE BUENAVISTA' },
  { CiuCodigo: 15, CiuNombre: 'SAN ZENON' },
  { CiuCodigo: 15, CiuNombre: 'SANTA ANA' },
  { CiuCodigo: 15, CiuNombre: 'SITIONUEVO' },
  { CiuCodigo: 15, CiuNombre: 'TENERIFE' },
  { CiuCodigo: 16, CiuNombre: 'VILLAVICENCIO' },
  { CiuCodigo: 16, CiuNombre: 'ACACIAS' },
  { CiuCodigo: 16, CiuNombre: 'BARRANCA DE UPIA' },
  { CiuCodigo: 16, CiuNombre: 'CABUYARO' },
  { CiuCodigo: 16, CiuNombre: 'CASTILLA LA NUEVA' },
  { CiuCodigo: 16, CiuNombre: 'SAN LUIS DE CUBARRAL' },
  { CiuCodigo: 16, CiuNombre: 'CUMARAL' },
  { CiuCodigo: 16, CiuNombre: 'EL CALVARIO' },
  { CiuCodigo: 16, CiuNombre: 'EL CASTILLO' },
  { CiuCodigo: 16, CiuNombre: 'EL DORADO' },
  { CiuCodigo: 16, CiuNombre: 'FUENTE DE ORO' },
  { CiuCodigo: 16, CiuNombre: 'GRANADA' },
  { CiuCodigo: 16, CiuNombre: 'GUAMAL' },
  { CiuCodigo: 16, CiuNombre: 'MAPIRIPAN' },
  { CiuCodigo: 16, CiuNombre: 'MESETAS' },
  { CiuCodigo: 16, CiuNombre: 'LA MACARENA' },
  { CiuCodigo: 16, CiuNombre: 'LA URIBE' },
  { CiuCodigo: 16, CiuNombre: 'LEJANIAS' },
  { CiuCodigo: 16, CiuNombre: 'PUERTO CONCORDIA' },
  { CiuCodigo: 16, CiuNombre: 'PUERTO GAITAN' },
  { CiuCodigo: 16, CiuNombre: 'PUERTO LOPEZ' },
  { CiuCodigo: 16, CiuNombre: 'PUERTO LLERAS' },
  { CiuCodigo: 16, CiuNombre: 'PUERTO RICO' },
  { CiuCodigo: 16, CiuNombre: 'RESTREPO' },
  { CiuCodigo: 16, CiuNombre: 'SAN CARLOS DE GUAROA' },
  { CiuCodigo: 16, CiuNombre: 'SAN JUAN DE ARAMA' },
  { CiuCodigo: 16, CiuNombre: 'SAN JUANITO' },
  { CiuCodigo: 16, CiuNombre: 'SAN MARTIN' },
  { CiuCodigo: 16, CiuNombre: 'VISTAHERMOSA' },
  { CiuCodigo: 17, CiuNombre: 'PASTO (SAN JUAN DE PASTO)' },
  { CiuCodigo: 17, CiuNombre: 'ALBAN (SAN JOSE)' },
  { CiuCodigo: 17, CiuNombre: 'ALDANA' },
  { CiuCodigo: 17, CiuNombre: 'ANCUYA' },
  { CiuCodigo: 17, CiuNombre: 'ARBOLEDA (BERRUECOS)' },
  { CiuCodigo: 17, CiuNombre: 'BARBACOAS' },
  { CiuCodigo: 17, CiuNombre: 'BELEN' },
  { CiuCodigo: 17, CiuNombre: 'BUESACO' },
  { CiuCodigo: 17, CiuNombre: 'COLON (GENOVA)' },
  { CiuCodigo: 17, CiuNombre: 'CONSACA' },
  { CiuCodigo: 17, CiuNombre: 'CONTADERO' },
  { CiuCodigo: 17, CiuNombre: 'CORDOBA' },
  { CiuCodigo: 17, CiuNombre: 'CUASPUD (CARLOSAMA)' },
  { CiuCodigo: 17, CiuNombre: 'CUMBAL' },
  { CiuCodigo: 17, CiuNombre: 'CUMBITARA' },
  { CiuCodigo: 17, CiuNombre: 'CHACHAGUI' },
  { CiuCodigo: 17, CiuNombre: 'EL CHARCO' },
  { CiuCodigo: 17, CiuNombre: 'EL PEÑOL' },
  { CiuCodigo: 17, CiuNombre: 'EL ROSARIO' },
  { CiuCodigo: 17, CiuNombre: 'EL TABLON' },
  { CiuCodigo: 17, CiuNombre: 'EL TAMBO' },
  { CiuCodigo: 17, CiuNombre: 'FUNES' },
  { CiuCodigo: 17, CiuNombre: 'GUACHUCAL' },
  { CiuCodigo: 17, CiuNombre: 'GUAITARILLA' },
  { CiuCodigo: 17, CiuNombre: 'GUALMATAN' },
  { CiuCodigo: 17, CiuNombre: 'ILES' },
  { CiuCodigo: 17, CiuNombre: 'IMUES' },
  { CiuCodigo: 17, CiuNombre: 'IPIALES' },
  { CiuCodigo: 17, CiuNombre: 'LA CRUZ' },
  { CiuCodigo: 17, CiuNombre: 'LA FLORIDA' },
  { CiuCodigo: 17, CiuNombre: 'LA LLANADA' },
  { CiuCodigo: 17, CiuNombre: 'LA TOLA' },
  { CiuCodigo: 17, CiuNombre: 'LA UNION' },
  { CiuCodigo: 17, CiuNombre: 'LEIVA' },
  { CiuCodigo: 17, CiuNombre: 'LINARES' },
  { CiuCodigo: 17, CiuNombre: 'LOS ANDES (SOTOMAYOR)' },
  { CiuCodigo: 17, CiuNombre: 'MAGUI (PAYAN)' },
  { CiuCodigo: 17, CiuNombre: 'MALLAMA (PIEDRANCHA)' },
  { CiuCodigo: 17, CiuNombre: 'MOSQUERA' },
  { CiuCodigo: 17, CiuNombre: 'OLAYA HERRERA (BOCAS DE SATINGA)' },
  { CiuCodigo: 17, CiuNombre: 'OSPINA' },
  { CiuCodigo: 17, CiuNombre: 'FRANCISCO PIZARRO (SALAHONDA)' },
  { CiuCodigo: 17, CiuNombre: 'POLICARPA' },
  { CiuCodigo: 17, CiuNombre: 'POTOSI' },
  { CiuCodigo: 17, CiuNombre: 'PROVIDENCIA' },
  { CiuCodigo: 17, CiuNombre: 'PUERRES' },
  { CiuCodigo: 17, CiuNombre: 'PUPIALES' },
  { CiuCodigo: 17, CiuNombre: 'RICAURTE' },
  { CiuCodigo: 17, CiuNombre: 'ROBERTO PAYAN (SAN JOSE)' },
  { CiuCodigo: 17, CiuNombre: 'SAMANIEGO' },
  { CiuCodigo: 17, CiuNombre: 'SANDONA' },
  { CiuCodigo: 17, CiuNombre: 'SAN BERNARDO' },
  { CiuCodigo: 17, CiuNombre: 'SAN LORENZO' },
  { CiuCodigo: 17, CiuNombre: 'SAN PABLO' },
  { CiuCodigo: 17, CiuNombre: 'SAN PEDRO DE CARTAGO' },
  { CiuCodigo: 17, CiuNombre: 'SANTA BARBARA (ISCUANDE)' },
  { CiuCodigo: 17, CiuNombre: 'SANTA CRUZ (GUACHAVES)' },
  { CiuCodigo: 17, CiuNombre: 'SAPUYES' },
  { CiuCodigo: 17, CiuNombre: 'TAMINANGO' },
  { CiuCodigo: 17, CiuNombre: 'TANGUA' },
  { CiuCodigo: 17, CiuNombre: 'TUMACO' },
  { CiuCodigo: 17, CiuNombre: 'TUQUERRES' },
  { CiuCodigo: 17, CiuNombre: 'YACUANQUER' },
  { CiuCodigo: 18, CiuNombre: 'CUCUTA' },
  { CiuCodigo: 18, CiuNombre: 'ABREGO' },
  { CiuCodigo: 18, CiuNombre: 'ARBOLEDAS' },
  { CiuCodigo: 18, CiuNombre: 'BOCHALEMA' },
  { CiuCodigo: 18, CiuNombre: 'BUCARASICA' },
  { CiuCodigo: 18, CiuNombre: 'CACOTA' },
  { CiuCodigo: 18, CiuNombre: 'CACHIRA' },
  { CiuCodigo: 18, CiuNombre: 'CHINACOTA' },
  { CiuCodigo: 18, CiuNombre: 'CHITAGA' },
  { CiuCodigo: 18, CiuNombre: 'CONVENCION' },
  { CiuCodigo: 18, CiuNombre: 'CUCUTILLA' },
  { CiuCodigo: 18, CiuNombre: 'DURANIA' },
  { CiuCodigo: 18, CiuNombre: 'EL CARMEN' },
  { CiuCodigo: 18, CiuNombre: 'EL TARRA' },
  { CiuCodigo: 18, CiuNombre: 'EL ZULIA' },
  { CiuCodigo: 18, CiuNombre: 'GRAMALOTE' },
  { CiuCodigo: 18, CiuNombre: 'HACARI' },
  { CiuCodigo: 18, CiuNombre: 'HERRAN' },
  { CiuCodigo: 18, CiuNombre: 'LABATECA' },
  { CiuCodigo: 18, CiuNombre: 'LA ESPERANZA' },
  { CiuCodigo: 18, CiuNombre: 'LA PLAYA' },
  { CiuCodigo: 18, CiuNombre: 'LOS PATIOS' },
  { CiuCodigo: 18, CiuNombre: 'LOURDES' },
  { CiuCodigo: 18, CiuNombre: 'MUTISCUA' },
  { CiuCodigo: 18, CiuNombre: 'OCAÑA' },
  { CiuCodigo: 18, CiuNombre: 'PAMPLONA' },
  { CiuCodigo: 18, CiuNombre: 'PAMPLONITA' },
  { CiuCodigo: 18, CiuNombre: 'PUERTO SANTANDER' },
  { CiuCodigo: 18, CiuNombre: 'RAGONVALIA' },
  { CiuCodigo: 18, CiuNombre: 'SALAZAR' },
  { CiuCodigo: 18, CiuNombre: 'SAN CALIXTO' },
  { CiuCodigo: 18, CiuNombre: 'SAN CAYETANO' },
  { CiuCodigo: 18, CiuNombre: 'SANTIAGO' },
  { CiuCodigo: 18, CiuNombre: 'SARDINATA' },
  { CiuCodigo: 18, CiuNombre: 'SILOS' },
  { CiuCodigo: 18, CiuNombre: 'TEORAMA' },
  { CiuCodigo: 18, CiuNombre: 'TIBU' },
  { CiuCodigo: 18, CiuNombre: 'TOLEDO' },
  { CiuCodigo: 18, CiuNombre: 'VILLACARO' },
  { CiuCodigo: 18, CiuNombre: 'VILLA DEL ROSARIO' },
  { CiuCodigo: 19, CiuNombre: 'ARMENIA' },
  { CiuCodigo: 19, CiuNombre: 'BUENAVISTA' },
  { CiuCodigo: 19, CiuNombre: 'CALARCA' },
  { CiuCodigo: 19, CiuNombre: 'CIRCASIA' },
  { CiuCodigo: 19, CiuNombre: 'CORDOBA' },
  { CiuCodigo: 19, CiuNombre: 'FILANDIA' },
  { CiuCodigo: 19, CiuNombre: 'GENOVA' },
  { CiuCodigo: 19, CiuNombre: 'LA TEBAIDA' },
  { CiuCodigo: 19, CiuNombre: 'MONTENEGRO' },
  { CiuCodigo: 19, CiuNombre: 'PIJAO' },
  { CiuCodigo: 19, CiuNombre: 'QUIMBAYA' },
  { CiuCodigo: 19, CiuNombre: 'SALENTO' },
  { CiuCodigo: 20, CiuNombre: 'PEREIRA' },
  { CiuCodigo: 20, CiuNombre: 'APIA' },
  { CiuCodigo: 20, CiuNombre: 'BALBOA' },
  { CiuCodigo: 20, CiuNombre: 'BELEN DE UMBRIA' },
  { CiuCodigo: 20, CiuNombre: 'DOS QUEBRADAS' },
  { CiuCodigo: 20, CiuNombre: 'GUATICA' },
  { CiuCodigo: 20, CiuNombre: 'LA CELIA' },
  { CiuCodigo: 20, CiuNombre: 'LA VIRGINIA' },
  { CiuCodigo: 20, CiuNombre: 'MARSELLA' },
  { CiuCodigo: 20, CiuNombre: 'MISTRATO' },
  { CiuCodigo: 20, CiuNombre: 'PUEBLO RICO' },
  { CiuCodigo: 20, CiuNombre: 'QUINCHIA' },
  { CiuCodigo: 20, CiuNombre: 'SANTA ROSA DE CABAL' },
  { CiuCodigo: 20, CiuNombre: 'SANTUARIO' },
  { CiuCodigo: 21, CiuNombre: 'BUCARAMANGA' },
  { CiuCodigo: 21, CiuNombre: 'AGUADA' },
  { CiuCodigo: 21, CiuNombre: 'ALBANIA' },
  { CiuCodigo: 21, CiuNombre: 'ARATOCA' },
  { CiuCodigo: 21, CiuNombre: 'BARBOSA' },
  { CiuCodigo: 21, CiuNombre: 'BARICHARA' },
  { CiuCodigo: 21, CiuNombre: 'BARRANCABERMEJA' },
  { CiuCodigo: 21, CiuNombre: 'BETULIA' },
  { CiuCodigo: 21, CiuNombre: 'BOLIVAR' },
  { CiuCodigo: 21, CiuNombre: 'CABRERA' },
  { CiuCodigo: 21, CiuNombre: 'CALIFORNIA' },
  { CiuCodigo: 21, CiuNombre: 'CAPITANEJO' },
  { CiuCodigo: 21, CiuNombre: 'CARCASI' },
  { CiuCodigo: 21, CiuNombre: 'CEPITA' },
  { CiuCodigo: 21, CiuNombre: 'CERRITO' },
  { CiuCodigo: 21, CiuNombre: 'CHARALA' },
  { CiuCodigo: 21, CiuNombre: 'CHARTA' },
  { CiuCodigo: 21, CiuNombre: 'CHIMA' },
  { CiuCodigo: 21, CiuNombre: 'CHIPATA' },
  { CiuCodigo: 21, CiuNombre: 'CIMITARRA' },
  { CiuCodigo: 21, CiuNombre: 'CONCEPCION' },
  { CiuCodigo: 21, CiuNombre: 'CONFINES' },
  { CiuCodigo: 21, CiuNombre: 'CONTRATACION' },
  { CiuCodigo: 21, CiuNombre: 'COROMORO' },
  { CiuCodigo: 21, CiuNombre: 'CURITI' },
  { CiuCodigo: 21, CiuNombre: 'EL CARMEN DE CHUCURY' },
  { CiuCodigo: 21, CiuNombre: 'EL GUACAMAYO' },
  { CiuCodigo: 21, CiuNombre: 'EL PEÑON' },
  { CiuCodigo: 21, CiuNombre: 'EL PLAYON' },
  { CiuCodigo: 21, CiuNombre: 'ENCINO' },
  { CiuCodigo: 21, CiuNombre: 'ENCISO' },
  { CiuCodigo: 21, CiuNombre: 'FLORIAN' },
  { CiuCodigo: 21, CiuNombre: 'FLORIDABLANCA' },
  { CiuCodigo: 21, CiuNombre: 'GALAN' },
  { CiuCodigo: 21, CiuNombre: 'GAMBITA' },
  { CiuCodigo: 21, CiuNombre: 'GIRON' },
  { CiuCodigo: 21, CiuNombre: 'GUACA' },
  { CiuCodigo: 21, CiuNombre: 'GUADALUPE' },
  { CiuCodigo: 21, CiuNombre: 'GUAPOTA' },
  { CiuCodigo: 21, CiuNombre: 'GUAVATA' },
  { CiuCodigo: 21, CiuNombre: 'GUEPSA' },
  { CiuCodigo: 21, CiuNombre: 'HATO' },
  { CiuCodigo: 21, CiuNombre: 'JESUS MARIA' },
  { CiuCodigo: 21, CiuNombre: 'JORDAN' },
  { CiuCodigo: 21, CiuNombre: 'LA BELLEZA' },
  { CiuCodigo: 21, CiuNombre: 'LANDAZURI' },
  { CiuCodigo: 21, CiuNombre: 'LA PAZ' },
  { CiuCodigo: 21, CiuNombre: 'LEBRIJA' },
  { CiuCodigo: 21, CiuNombre: 'LOS SANTOS' },
  { CiuCodigo: 21, CiuNombre: 'MACARAVITA' },
  { CiuCodigo: 21, CiuNombre: 'MALAGA' },
  { CiuCodigo: 21, CiuNombre: 'MATANZA' },
  { CiuCodigo: 21, CiuNombre: 'MOGOTES' },
  { CiuCodigo: 21, CiuNombre: 'MOLAGAVITA' },
  { CiuCodigo: 21, CiuNombre: 'OCAMONTE' },
  { CiuCodigo: 21, CiuNombre: 'OIBA' },
  { CiuCodigo: 21, CiuNombre: 'ONZAGA' },
  { CiuCodigo: 21, CiuNombre: 'PALMAR' },
  { CiuCodigo: 21, CiuNombre: 'PALMAS DEL SOCORRO' },
  { CiuCodigo: 21, CiuNombre: 'PARAMO' },
  { CiuCodigo: 21, CiuNombre: 'PIEDECUESTA' },
  { CiuCodigo: 21, CiuNombre: 'PINCHOTE' },
  { CiuCodigo: 21, CiuNombre: 'PUENTE NACIONAL' },
  { CiuCodigo: 21, CiuNombre: 'PUERTO PARRA' },
  { CiuCodigo: 21, CiuNombre: 'PUERTO WILCHES' },
  { CiuCodigo: 21, CiuNombre: 'RIONEGRO' },
  { CiuCodigo: 21, CiuNombre: 'SABANA DE TORRES' },
  { CiuCodigo: 21, CiuNombre: 'SAN ANDRES' },
  { CiuCodigo: 21, CiuNombre: 'SAN BENITO' },
  { CiuCodigo: 21, CiuNombre: 'SAN GIL' },
  { CiuCodigo: 21, CiuNombre: 'SAN JOAQUIN' },
  { CiuCodigo: 21, CiuNombre: 'SAN JOSE DE MIRANDA' },
  { CiuCodigo: 21, CiuNombre: 'SAN MIGUEL' },
  { CiuCodigo: 21, CiuNombre: 'SAN VICENTE DE CHUCURI' },
  { CiuCodigo: 21, CiuNombre: 'SANTA BARBARA' },
  { CiuCodigo: 21, CiuNombre: 'SANTA HELENA DEL OPON' },
  { CiuCodigo: 21, CiuNombre: 'SIMACOTA' },
  { CiuCodigo: 21, CiuNombre: 'SOCORRO' },
  { CiuCodigo: 21, CiuNombre: 'SUAITA' },
  { CiuCodigo: 21, CiuNombre: 'SUCRE' },
  { CiuCodigo: 21, CiuNombre: 'SURATA' },
  { CiuCodigo: 21, CiuNombre: 'TONA' },
  { CiuCodigo: 21, CiuNombre: 'VALLE SAN JOSE' },
  { CiuCodigo: 21, CiuNombre: 'VELEZ' },
  { CiuCodigo: 21, CiuNombre: 'VETAS' },
  { CiuCodigo: 21, CiuNombre: 'VILLANUEVA' },
  { CiuCodigo: 21, CiuNombre: 'ZAPATOCA' },
  { CiuCodigo: 22, CiuNombre: 'SINCELEJO' },
  { CiuCodigo: 22, CiuNombre: 'BUENAVISTA' },
  { CiuCodigo: 22, CiuNombre: 'CAIMITO' },
  { CiuCodigo: 22, CiuNombre: 'COLOSO (RICAURTE)' },
  { CiuCodigo: 22, CiuNombre: 'COROZAL' },
  { CiuCodigo: 22, CiuNombre: 'CHALAN' },
  { CiuCodigo: 22, CiuNombre: 'GALERAS (NUEVA GRANADA)' },
  { CiuCodigo: 22, CiuNombre: 'GUARANDA' },
  { CiuCodigo: 22, CiuNombre: 'LA UNION' },
  { CiuCodigo: 22, CiuNombre: 'LOS PALMITOS' },
  { CiuCodigo: 22, CiuNombre: 'MAJAGUAL' },
  { CiuCodigo: 22, CiuNombre: 'MORROA' },
  { CiuCodigo: 22, CiuNombre: 'OVEJAS' },
  { CiuCodigo: 22, CiuNombre: 'PALMITO' },
  { CiuCodigo: 22, CiuNombre: 'SAMPUES' },
  { CiuCodigo: 22, CiuNombre: 'SAN BENITO ABAD' },
  { CiuCodigo: 22, CiuNombre: 'SAN JUAN DE BETULIA' },
  { CiuCodigo: 22, CiuNombre: 'SAN MARCOS' },
  { CiuCodigo: 22, CiuNombre: 'SAN ONOFRE' },
  { CiuCodigo: 22, CiuNombre: 'SAN PEDRO' },
  { CiuCodigo: 22, CiuNombre: 'SINCE' },
  { CiuCodigo: 22, CiuNombre: 'SUCRE' },
  { CiuCodigo: 22, CiuNombre: 'TOLU' },
  { CiuCodigo: 22, CiuNombre: 'TOLUVIEJO' },
  { CiuCodigo: 23, CiuNombre: 'IBAGUE' },
  { CiuCodigo: 23, CiuNombre: 'ALPUJARRA' },
  { CiuCodigo: 23, CiuNombre: 'ALVARADO' },
  { CiuCodigo: 23, CiuNombre: 'AMBALEMA' },
  { CiuCodigo: 23, CiuNombre: 'ANZOATEGUI' },
  { CiuCodigo: 23, CiuNombre: 'ARMERO (GUAYABAL)' },
  { CiuCodigo: 23, CiuNombre: 'ATACO' },
  { CiuCodigo: 23, CiuNombre: 'CAJAMARCA' },
  { CiuCodigo: 23, CiuNombre: 'CARMEN APICALA' },
  { CiuCodigo: 23, CiuNombre: 'CASABIANCA' },
  { CiuCodigo: 23, CiuNombre: 'CHAPARRAL' },
  { CiuCodigo: 23, CiuNombre: 'COELLO' },
  { CiuCodigo: 23, CiuNombre: 'COYAIMA' },
  { CiuCodigo: 23, CiuNombre: 'CUNDAY' },
  { CiuCodigo: 23, CiuNombre: 'DOLORES' },
  { CiuCodigo: 23, CiuNombre: 'ESPINAL' },
  { CiuCodigo: 23, CiuNombre: 'FALAN' },
  { CiuCodigo: 23, CiuNombre: 'FLANDES' },
  { CiuCodigo: 23, CiuNombre: 'FRESNO' },
  { CiuCodigo: 23, CiuNombre: 'GUAMO' },
  { CiuCodigo: 23, CiuNombre: 'HERVEO' },
  { CiuCodigo: 23, CiuNombre: 'HONDA' },
  { CiuCodigo: 23, CiuNombre: 'ICONONZO' },
  { CiuCodigo: 23, CiuNombre: 'LERIDA' },
  { CiuCodigo: 23, CiuNombre: 'LIBANO' },
  { CiuCodigo: 23, CiuNombre: 'MARIQUITA' },
  { CiuCodigo: 23, CiuNombre: 'MELGAR' },
  { CiuCodigo: 23, CiuNombre: 'MURILLO' },
  { CiuCodigo: 23, CiuNombre: 'NATAGAIMA' },
  { CiuCodigo: 23, CiuNombre: 'ORTEGA' },
  { CiuCodigo: 23, CiuNombre: 'PALOCABILDO' },
  { CiuCodigo: 23, CiuNombre: 'PIEDRAS' },
  { CiuCodigo: 23, CiuNombre: 'PLANADAS' },
  { CiuCodigo: 23, CiuNombre: 'PRADO' },
  { CiuCodigo: 23, CiuNombre: 'PURIFICACION' },
  { CiuCodigo: 23, CiuNombre: 'RIOBLANCO' },
  { CiuCodigo: 23, CiuNombre: 'RONCESVALLES' },
  { CiuCodigo: 23, CiuNombre: 'ROVIRA' },
  { CiuCodigo: 23, CiuNombre: 'SALDAÑA' },
  { CiuCodigo: 23, CiuNombre: 'SAN ANTONIO' },
  { CiuCodigo: 23, CiuNombre: 'SAN LUIS' },
  { CiuCodigo: 23, CiuNombre: 'SANTA ISABEL' },
  { CiuCodigo: 23, CiuNombre: 'SUAREZ' },
  { CiuCodigo: 23, CiuNombre: 'VALLE DE SAN JUAN' },
  { CiuCodigo: 23, CiuNombre: 'VENADILLO' },
  { CiuCodigo: 23, CiuNombre: 'VILLAHERMOSA' },
  { CiuCodigo: 23, CiuNombre: 'VILLARRICA' },
  { CiuCodigo: 24, CiuNombre: 'CALI (SANTIAGO DE CALI)' },
  { CiuCodigo: 24, CiuNombre: 'ALCALA' },
  { CiuCodigo: 24, CiuNombre: 'ANDALUCIA' },
  { CiuCodigo: 24, CiuNombre: 'ANSERMANUEVO' },
  { CiuCodigo: 24, CiuNombre: 'ARGELIA' },
  { CiuCodigo: 24, CiuNombre: 'BOLIVAR' },
  { CiuCodigo: 24, CiuNombre: 'BUENAVENTURA' },
  { CiuCodigo: 24, CiuNombre: 'BUGA' },
  { CiuCodigo: 24, CiuNombre: 'BUGALAGRANDE' },
  { CiuCodigo: 24, CiuNombre: 'CAICEDONIA' },
  { CiuCodigo: 24, CiuNombre: 'CALIMA (DARIEN)' },
  { CiuCodigo: 24, CiuNombre: 'CANDELARIA' },
  { CiuCodigo: 24, CiuNombre: 'CARTAGO' },
  { CiuCodigo: 24, CiuNombre: 'DAGUA' },
  { CiuCodigo: 24, CiuNombre: 'EL AGUILA' },
  { CiuCodigo: 24, CiuNombre: 'EL CAIRO' },
  { CiuCodigo: 24, CiuNombre: 'EL CERRITO' },
  { CiuCodigo: 24, CiuNombre: 'EL DOVIO' },
  { CiuCodigo: 24, CiuNombre: 'FLORIDA' },
  { CiuCodigo: 24, CiuNombre: 'GINEBRA' },
  { CiuCodigo: 24, CiuNombre: 'GUACARI' },
  { CiuCodigo: 24, CiuNombre: 'JAMUNDI' },
  { CiuCodigo: 24, CiuNombre: 'LA CUMBRE' },
  { CiuCodigo: 24, CiuNombre: 'LA UNION' },
  { CiuCodigo: 24, CiuNombre: 'LA VICTORIA' },
  { CiuCodigo: 24, CiuNombre: 'OBANDO' },
  { CiuCodigo: 24, CiuNombre: 'PALMIRA' },
  { CiuCodigo: 24, CiuNombre: 'PRADERA' },
  { CiuCodigo: 24, CiuNombre: 'RESTREPO' },
  { CiuCodigo: 24, CiuNombre: 'RIOFRIO' },
  { CiuCodigo: 24, CiuNombre: 'ROLDANILLO' },
  { CiuCodigo: 24, CiuNombre: 'SAN PEDRO' },
  { CiuCodigo: 24, CiuNombre: 'SEVILLA' },
  { CiuCodigo: 24, CiuNombre: 'TORO' },
  { CiuCodigo: 24, CiuNombre: 'TRUJILLO' },
  { CiuCodigo: 24, CiuNombre: 'TULUA' },
  { CiuCodigo: 24, CiuNombre: 'ULLOA' },
  { CiuCodigo: 24, CiuNombre: 'VERSALLES' },
  { CiuCodigo: 24, CiuNombre: 'VIJES' },
  { CiuCodigo: 24, CiuNombre: 'YOTOCO' },
  { CiuCodigo: 24, CiuNombre: 'YUMBO' },
  { CiuCodigo: 24, CiuNombre: 'ZARZAL' },
  { CiuCodigo: 25, CiuNombre: 'ARAUCA' },
  { CiuCodigo: 25, CiuNombre: 'ARAUQUITA' },
  { CiuCodigo: 25, CiuNombre: 'CRAVO NORTE' },
  { CiuCodigo: 25, CiuNombre: 'FORTUL' },
  { CiuCodigo: 25, CiuNombre: 'PUERTO RONDON' },
  { CiuCodigo: 25, CiuNombre: 'SARAVENA' },
  { CiuCodigo: 25, CiuNombre: 'TAME' },
  { CiuCodigo: 26, CiuNombre: 'YOPAL' },
  { CiuCodigo: 26, CiuNombre: 'AGUAZUL' },
  { CiuCodigo: 26, CiuNombre: 'CHAMEZA' },
  { CiuCodigo: 26, CiuNombre: 'HATO COROZAL' },
  { CiuCodigo: 26, CiuNombre: 'LA SALINA' },
  { CiuCodigo: 26, CiuNombre: 'MANI' },
  { CiuCodigo: 26, CiuNombre: 'MONTERREY' },
  { CiuCodigo: 26, CiuNombre: 'NUNCHIA' },
  { CiuCodigo: 26, CiuNombre: 'OROCUE' },
  { CiuCodigo: 26, CiuNombre: 'PAZ DE ARIPORO' },
  { CiuCodigo: 26, CiuNombre: 'PORE' },
  { CiuCodigo: 26, CiuNombre: 'RECETOR' },
  { CiuCodigo: 26, CiuNombre: 'SABANALARGA' },
  { CiuCodigo: 26, CiuNombre: 'SACAMA' },
  { CiuCodigo: 26, CiuNombre: 'SAN LUIS DE PALENQUE' },
  { CiuCodigo: 26, CiuNombre: 'TAMARA' },
  { CiuCodigo: 26, CiuNombre: 'TAURAMENA' },
  { CiuCodigo: 26, CiuNombre: 'TRINIDAD' },
  { CiuCodigo: 26, CiuNombre: 'VILLANUEVA' },
  { CiuCodigo: 27, CiuNombre: 'MOCOA' },
  { CiuCodigo: 27, CiuNombre: 'COLON' },
  { CiuCodigo: 27, CiuNombre: 'ORITO' },
  { CiuCodigo: 27, CiuNombre: 'PUERTO ASIS' },
  { CiuCodigo: 27, CiuNombre: 'PUERTO CAICEDO' },
  { CiuCodigo: 27, CiuNombre: 'PUERTO GUZMAN' },
  { CiuCodigo: 27, CiuNombre: 'PUERTO LEGUIZAMO' },
  { CiuCodigo: 27, CiuNombre: 'SIBUNDOY' },
  { CiuCodigo: 27, CiuNombre: 'SAN FRANCISCO' },
  { CiuCodigo: 27, CiuNombre: 'SAN MIGUEL (LA DORADA)' },
  { CiuCodigo: 27, CiuNombre: 'SANTIAGO' },
  { CiuCodigo: 27, CiuNombre: 'LA HORMIGA (VALLE DEL GUAMUEZ)' },
  { CiuCodigo: 27, CiuNombre: 'VILLAGARZON' },
  { CiuCodigo: 28, CiuNombre: 'SAN ANDRES' },
  { CiuCodigo: 28, CiuNombre: 'PROVIDENCIA' },
  { CiuCodigo: 29, CiuNombre: 'LETICIA' },
  { CiuCodigo: 29, CiuNombre: 'EL ENCANTO' },
  { CiuCodigo: 29, CiuNombre: 'LA CHORRERA' },
  { CiuCodigo: 29, CiuNombre: 'LA PEDRERA' },
  { CiuCodigo: 29, CiuNombre: 'LA VICTORIA' },
  { CiuCodigo: 29, CiuNombre: 'MIRITI-PARANA' },
  { CiuCodigo: 29, CiuNombre: 'PUERTO ALEGRIA' },
  { CiuCodigo: 29, CiuNombre: 'PUERTO ARICA' },
  { CiuCodigo: 29, CiuNombre: 'PUERTO NARIÑO' },
  { CiuCodigo: 29, CiuNombre: 'PUERTO SANTANDER' },
  { CiuCodigo: 29, CiuNombre: 'TARAPACA' },
  { CiuCodigo: 30, CiuNombre: 'PUERTO INIRIDA' },
  { CiuCodigo: 30, CiuNombre: 'BARRANCO MINAS' },
  { CiuCodigo: 30, CiuNombre: 'SAN FELIPE' },
  { CiuCodigo: 30, CiuNombre: 'PUERTO COLOMBIA' },
  { CiuCodigo: 30, CiuNombre: 'LA GUADALUPE' },
  { CiuCodigo: 30, CiuNombre: 'CACAHUAL' },
  { CiuCodigo: 30, CiuNombre: 'PANA PANA (CAMPO ALEGRE)' },
  { CiuCodigo: 30, CiuNombre: 'MORICHAL (MORICHAL NUEVO)' },
  { CiuCodigo: 31, CiuNombre: 'SAN JOSE DEL GUAVIARE' },
  { CiuCodigo: 31, CiuNombre: 'CALAMAR' },
  { CiuCodigo: 31, CiuNombre: 'EL RETORNO' },
  { CiuCodigo: 31, CiuNombre: 'MIRAFLORES' },
  { CiuCodigo: 32, CiuNombre: 'MITU' },
  { CiuCodigo: 32, CiuNombre: 'CARURU' },
  { CiuCodigo: 32, CiuNombre: 'PACOA' },
  { CiuCodigo: 32, CiuNombre: 'TARAIRA' },
  { CiuCodigo: 32, CiuNombre: 'PAPUNAUA (MORICHAL)' },
  { CiuCodigo: 32, CiuNombre: 'YAVARATE' },
  { CiuCodigo: 33, CiuNombre: 'PUERTO CARREÑO' },
  { CiuCodigo: 33, CiuNombre: 'LA PRIMAVERA' },
  { CiuCodigo: 33, CiuNombre: 'SANTA RITA' },
  { CiuCodigo: 33, CiuNombre: 'SANTA ROSALIA' },
  { CiuCodigo: 33, CiuNombre: 'SAN JOSE DE OCUNE' },
  { CiuCodigo: 33, CiuNombre: 'CUMARIBO' }
  ];
  public factor =[
    { codfactor: 1, nomfactor: '1' },
    { codfactor: 2, nomfactor: '2' },
    { codfactor: 3, nomfactor: '3' },
    { codfactor: 4, nomfactor: '4' },
    { codfactor: 5, nomfactor: '5' }
];
public caracteristica =[
    { codfactor:1, codcaracteristica: 11, nomcaracteristica: '1.1' },
    { codfactor:1, codcaracteristica: 12, nomcaracteristica: '1.2' },
    { codfactor:1, codcaracteristica: 13, nomcaracteristica: '1.3' },
    { codfactor:1, codcaracteristica: 14, nomcaracteristica: '1.4' },
    { codfactor:1, codcaracteristica: 15, nomcaracteristica: '1.5' },

    { codfactor:2, codcaracteristica: 21, nomcaracteristica: '2.1' },
    { codfactor:2, codcaracteristica: 22, nomcaracteristica: '2.2' },
    { codfactor:2, codcaracteristica: 23, nomcaracteristica: '2.3' },
    { codfactor:2, codcaracteristica: 24, nomcaracteristica: '2.4' },
    { codfactor:2, codcaracteristica: 25, nomcaracteristica: '2.5' },

    { codfactor:3, codcaracteristica: 31, nomcaracteristica: '3.1' },
    { codfactor:3, codcaracteristica: 32, nomcaracteristica: '3.2' },
    { codfactor:3, codcaracteristica: 33, nomcaracteristica: '3.3' },
    { codfactor:3, codcaracteristica: 34, nomcaracteristica: '3.4' },
    { codfactor:3, codcaracteristica: 35, nomcaracteristica: '3.5' },

    { codfactor:4, codcaracteristica: 41, nomcaracteristica: '4.1' },
    { codfactor:4, codcaracteristica: 42, nomcaracteristica: '4.2' },
    { codfactor:4, codcaracteristica: 43, nomcaracteristica: '4.3' },
    { codfactor:4, codcaracteristica: 44, nomcaracteristica: '4.4' },
    { codfactor:4, codcaracteristica: 45, nomcaracteristica: '4.5' },

    { codfactor:5, codcaracteristica: 51, nomcaracteristica: '5.1' },
    { codfactor:5, codcaracteristica: 52, nomcaracteristica: '5.2' },
    { codfactor:5, codcaracteristica: 53, nomcaracteristica: '5.3' },
    { codfactor:5, codcaracteristica: 54, nomcaracteristica: '5.4' },
    { codfactor:5, codcaracteristica: 55, nomcaracteristica: '5.5' },
];

public actividades=[
  { codcaracteristica:11, codactividad: 111, nomactividad: '1.1.1' },
  { codcaracteristica:11, codactividad: 122, nomactividad: '1.2.2' },
  { codcaracteristica:11, codactividad: 133, nomactividad: '1.3.3' },
  { codcaracteristica:11, codactividad: 144, nomactividad: '1.4.4' },
  { codcaracteristica:11, codactividad: 155, nomactividad: '1.5.5' },

  { codcaracteristica:12, codactividad: 121, nomactividad: '1.2.1' },
  { codcaracteristica:12, codactividad: 122, nomactividad: '1.2.2' },
  { codcaracteristica:12, codactividad: 123, nomactividad: '1.2.3' },
  { codcaracteristica:12, codactividad: 124, nomactividad: '1.2.4' },
  { codcaracteristica:12, codactividad: 125, nomactividad: '1.2.5' },

  { codcaracteristica:13, codactividad: 131, nomactividad: '1.3.1' },
  { codcaracteristica:13, codactividad: 132, nomactividad: '1.3.2' },
  { codcaracteristica:13, codactividad: 133, nomactividad: '1.3.3' },
  { codcaracteristica:13, codactividad: 134, nomactividad: '1.3.4' },
  { codcaracteristica:13, codactividad: 135, nomactividad: '1.3.5' },

  { codcaracteristica:14, codactividad: 141, nomactividad: '1.4.1' },
  { codcaracteristica:14, codactividad: 142, nomactividad: '1.4.2' },
  { codcaracteristica:14, codactividad: 143, nomactividad: '1.4.3' },
  { codcaracteristica:14, codactividad: 144, nomactividad: '1.4.4' },
  { codcaracteristica:14, codactividad: 145, nomactividad: '1.4.5' },

  { codcaracteristica:15, codactividad: 151, nomactividad: '1.5.1' },
  { codcaracteristica:15, codactividad: 152, nomactividad: '1.5.2' },
  { codcaracteristica:15, codactividad: 153, nomactividad: '1.5.3' },
  { codcaracteristica:15, codactividad: 154, nomactividad: '1.5.4' },
  { codcaracteristica:15, codactividad: 155, nomactividad: '1.5.5' },

  { codcaracteristica:21, codactividad: 211, nomactividad: '2.1.1' },
  { codcaracteristica:21, codactividad: 212, nomactividad: '2.1.2' },

  { codcaracteristica:22, codactividad: 221, nomactividad: '2.2.1' },
  { codcaracteristica:22, codactividad: 222, nomactividad: '2.2.2' },

  { codcaracteristica:23, codactividad: 234, nomactividad: '2.3.1' },
  { codcaracteristica:23, codactividad: 232, nomactividad: '2.3.2' },

  { codcaracteristica:24, codactividad: 241, nomactividad: '2.4.1' },
  { codcaracteristica:24, codactividad: 242, nomactividad: '2.4.2' },

  { codcaracteristica:25, codactividad: 251, nomactividad: '2.5.1' },
  { codcaracteristica:25, codactividad: 252, nomactividad: '2.5.2' },

  { codcaracteristica:31, codactividad: 311, nomactividad: '3.1.1' },
  { codcaracteristica:31, codactividad: 312, nomactividad: '3.1.2' },

  { codcaracteristica:32, codactividad: 321, nomactividad: '3.2.1' },
  { codcaracteristica:32, codactividad: 322, nomactividad: '3.2.2' },

  { codcaracteristica:33, codactividad: 331, nomactividad: '3.3.1' },
  { codcaracteristica:33, codactividad: 332, nomactividad: '3.3.2' },

  { codcaracteristica:34, codactividad: 341, nomactividad: '3.4.1' },
  { codcaracteristica:34, codactividad: 342, nomactividad: '3.4.2' },

  { codcaracteristica:35, codactividad: 351, nomactividad: '3.5.1' },
  { codcaracteristica:35, codactividad: 352, nomactividad: '3.5.2' },

  { codcaracteristica:41, codactividad: 411, nomactividad: '4.1.1' },
  { codcaracteristica:41, codactividad: 412, nomactividad: '4.1.2' },

  { codcaracteristica:42, codactividad: 421, nomactividad: '4.2.1' },
  { codcaracteristica:42, codactividad: 422, nomactividad: '4.2.2' },

  { codcaracteristica:43, codactividad: 431, nomactividad: '4.3.1' },
  { codcaracteristica:43, codactividad: 432, nomactividad: '4.3.2' },

  { codcaracteristica:44, codactividad: 441, nomactividad: '4.4.1' },
  { codcaracteristica:44, codactividad: 442, nomactividad: '4.4.2' },

  { codcaracteristica:45, codactividad: 451, nomactividad: '4.5.1' },
  { codcaracteristica:45, codactividad: 452, nomactividad: '4.5.2' },

  { codcaracteristica:51, codactividad: 511, nomactividad: '5.1.1' },
  { codcaracteristica:51, codactividad: 512, nomactividad: '5.1.2' },

  { codcaracteristica:52, codactividad: 521, nomactividad: '5.2.1' },
  { codcaracteristica:52, codactividad: 522, nomactividad: '5.2.2' },

  { codcaracteristica:53, codactividad: 531, nomactividad: '5.3.1' },
  { codcaracteristica:53, codactividad: 532, nomactividad: '5.3.2' },

  { codcaracteristica:54, codactividad: 541, nomactividad: '5.4.1' },
  { codcaracteristica:54, codactividad: 542, nomactividad: '5.4.2' },

  { codcaracteristica:55, codactividad: 551, nomactividad: '5.5.1' },
  { codcaracteristica:55, codactividad: 552, nomactividad: '5.5.2' },

];

  public filtradas=[{CiuCodigo: 1, CiuNombre: 'Seleccione Departamento '}];
  public filtrofactor=[{codcaracteristica: 0, nomcaracteristica: 'Seleccione Factor '}];
  public filtroactividad=[{codactividad: 0, nomactividad: 'Seleccione Caracteristica '}];

   constructor(private _userservice:ServiceService, private router: Router) {
this.departamentos;
this.getdatos()
  }
  

 




  agregar_actividad(form:NgForm){
    
    var varios_responsables="";
    
    var departamentoname=this.departamentos.filter(obj=>obj.DepCodigo==$(".dep").val());
    var unico_responsable=$(".unico_responsable option:selected").text();
    var anexos = this.dividir_anexos( $('.anex'));
    if(this.condicion=="grupal"){
       varios_responsables=this.dividir_responsables(this.selected);
    }
   
    let data={
      tipo_vinculacion:$(".tipo_vinculacion").val(),
      departamento:departamentoname[0].DepNombre,
      ciudad:$(".cius").val(),
      responsable:unico_responsable,
      responsables: varios_responsables,
      factor:$(".deps option:selected").text(),
      caracteristica:$(".car option:selected").text(),
      actividad:$(".act option:selected").text(),
      anexo:anexos,
      user:localStorage.getItem('currentUser')
    }
    let data1=form.value;
    let unidad=Object.assign(data,data1);
    delete unidad["first"]
   

    this._userservice.postActivity(unidad)
    .subscribe(res=>{
      this.logimage(res[0].id)
    });
    Swal.fire(
      {title: 'Actividad Agregada',
      text: "La Actividad Se Agrego Correctamente",
      icon: 'success',
      confirmButtonText: 'Continuar',
    }
    ).then(
      this.refresh
    );
    console.log(unidad)
    
  }

  inicio():void{
    this.router.navigate(['/principal'])
  }

  refresh(): void {
    window.location.reload(); 
 }

  dividir_responsables(item){
    let leter=""
    for (let index = 0; index < item.length; index++) {
      const element = item[index].item_id;
      leter=leter+","+element;
      
    }
    leter=leter.substr(1);
    return leter
  }
  dividir_anexos(item){
    let leter=""
    for (let index = 0; index < item.length; index++) {
      const element = item[index].value;
      leter=leter+","+element;
    }
    leter=leter.substr(1);
    return leter;
  }

	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

  logimage(id_carpeta){
    const formData=new FormData();
    for(let img of this.files){
      formData.append('file',img)
    }
   

    this._userservice.postmultiimagen(formData,id_carpeta).subscribe(
     (res)=>console.log(res)
      )
   
  }
  selectimage(event){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      console.log(file);
      
      this.images=file;
    }
  }

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}


  ngOnInit() {
    var url = window.location.href
    var spli = url.split("/");

    this.validarformulario(spli.pop());
    
    this.dropdownList=this.printdata(this.users);

    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    }
    
  }

  getdatos(){
    this._userservice.getUsers()
    //.subscribe(data=>this.users=data);
    .subscribe(data=>{
     
      this.users=data,
      this.dropdownList=this.printdata(data);
      console.log(this.dropdownList)
    
    });
  
  }

  printdata(dato){
    let jsonnew:Array<any>=[];
    if(!$.isEmptyObject(dato)){
     
     
      for (let index = 0; index <= dato.length-1; index++) {
        var a=dato[index];
        var indices={
          item_id:a.Nombres+" "+a.Apellidos,
          item_text:a.Nombres+" "+a.Apellidos
        }
        jsonnew.push(indices);
       
      }
      
      return jsonnew;
    }
    return jsonnew;

  }

  validarformulario(palabra: any) {
    this.condicion = palabra == "unico" ? "unico" : "grupal";
  }

  getData() {
    return [
      { item_id: 1, item_text: 'Omar Revelo' },
      { item_id: 2, item_text: 'Jorge Rivera' },
      { item_id: 3, item_text: 'Magda Calvache' },
      { item_id: 4, item_text: 'Raul Benavides' }
    ]
  }

  


  contar() {
    this.current++;
    switch (this.current) {
      case 2:
        $('.f1').hide();
        $('.f2').show();
        $('#personal').addClass('active');
        this.suma(this.current);
        break;
      case 3:
        $('.f2').hide();
        $('.f3').show();
        $('#descript').addClass('active');
        this.suma(this.current);
        break;
      case 4:
        $('.f3').hide();
        $('.f4').show();
        $('#payment').addClass('active');
        this.suma(this.current);
        break;
    }
  }
  descontar() {
    this.current--;
    switch (this.current) {
      case 1:
        $('.f2').hide();
        $('.f1').show();
        $('#personal').removeClass('active');
        this.suma(this.current);
        break;
      case 2:
        $('.f3').hide();
        $('.f2').show();
        $('#descript').removeClass('active');
        this.suma(this.current);
        break;
      case 3:
        $('.f4').hide();
        $('.f3').show();
        $('#payment').removeClass('active');
        this.suma(this.current);
        break;
    }
  }
  public suma(curStep: number) {
    var res = 100 / 5;
    var percent = parseFloat(res.toString()) * curStep;
    percent = Number(percent.toFixed());
    $('.progress-bar').css('width', percent + '%');
  }
  public guardar() {

    alert($("[name=Nombreactividad]").val())
  }
  onChange() {
    var valor=$("select.dep").val();
    this.deps(valor);
  }
  changefactor(){
    var valor=$("select.deps").val();
    this.caracter(valor);
    this.filtroactividad=[{codactividad: 0, nomactividad: 'Seleccione Caracteristica '}];
  }
  changecaracter(){
    var valor=$("select.car").val();
    this.actividad(valor);
  }
  deps(pais) {
    this.filtradas = this.ciudades.filter(elements=>elements.CiuCodigo==pais)
    return this.filtradas;
  }
  caracter(factor){
    this.filtrofactor=this.caracteristica.filter(elements=>elements.codfactor==factor)
    return this.filtrofactor;
  }
  actividad(caracter){
    this.filtroactividad=this.actividades.filter(elements=>elements.codcaracteristica==caracter)
    this.filtroactividad;
  }
  AgregarCampos(){
    this.nextinput++;
    const campo = ' <input type="text" name="Anexo[]" class="anex" id="anex'+this.nextinput+'" placeholder="Anexo '+this.nextinput+'"/>';
    $("#campos").append(campo);
  }
  eliminarcampo(){
   if(this.nextinput>=0){
    $("#anex"+this.nextinput).remove()
    this.nextinput--
  }
  }
    
   
 
  
}
