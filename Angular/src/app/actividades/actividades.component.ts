import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import {saveAs} from "file-saver";
import {ServiceService} from '../services/service.service';
import { IActivity } from '../modelo/activity';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  mensaje:string="hola mundo";
  public users=[] as any;
  public usersgrup=[] as any;
  public actividadsola=[] as any;
  constructor(
    private router: Router,private _userservice:ServiceService
  ) { }

  word(actividad:IActivity){
    let leter;
    for(var clave in actividad){

      if (actividad.hasOwnProperty(clave)) {
        // Mostrando en pantalla la clave junto a su valor
         leter=leter+" "+actividad[clave]
      }
    }
    
    /*
    let content='<table class="table table-dark"><thead><tr><th scope="col">#</th><th scope="col">First</th><th scope="col">Last</th><th scope="col">Handle</th></tr></thead><tbody><tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr><tr><th scope="row">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td></tr><tr><th scope="row">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td></tr></tbody></table>'
    let htmldocument='<!doctype html><html lang="en"><head><!-- Required meta tags --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><!-- Bootstrap CSS --><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"><title>Hello, world!</title>';
    htmldocument=htmldocument+'</head><body>'+content+'</body></html>'
    */
    let htmldocument='<!DOCTYPE html><html>    <head>        <title>Ejemplo del uso de tablas - aprenderaprogramar.com</title></head><body>';
    let finhtml='</body></html>'
    const converted=htmlDocx.asBlob(htmldocument+leter+finhtml)
   saveAs(converted,"prueba"+".docx");
  }

  nuevopdf(id){
    this._userservice.pdfdownload(id)
    .subscribe(data=>console.log(data));
    alert("Pdg Generado")
  }

  misrep = [
    {
      id: 1,
      Nombre: "Raul benavides",
      Codigo_proyecto: "005",
      Actividad: "Plan notas",
      Plan_mejoramiento: "segundo semestre 2021",
      Caracteristicas: "sistema de notas",
      Responsables: "Raul benavides"

    },
    {
      id: 2,
      Nombre: "Jorge Rivera",
      Codigo_proyecto: "009",
      Actividad: "Plan evaluativo",
      Plan_mejoramiento: "segundo semestre 2021",
      Caracteristicas: "sistema de evaluacion",
      Responsables: "Jorge Rivera"

    },
    {
      id: 3,
      Nombre: "magda Calvache",
      Codigo_proyecto: "025",
      Actividad: "Plan mejora",
      Plan_mejoramiento: "segundo semestre 2021",
      Caracteristicas: "sistema de mejora",
      Responsables: "Magda Calvache"

    },
    {
      id: 4,
      Nombre: "Omar Revelo",
      Codigo_proyecto: "035",
      Actividad: "Plan Rendimiento",
      Plan_mejoramiento: "segundo semestre 2021",
      Caracteristicas: "sistema de mejora",
      Responsables: "Omar Revelo"

    },
  ]

  ngOnInit(): void {
    $(".grupal").hide();
    this._userservice.getactivity()
    .subscribe(data=>this.users=data);
    this._userservice.getactivitygrupal()
    .subscribe(data=>this.usersgrup=data);
    
  }

  datosunicos(){ 
    this.router.navigate(['/datos/unico']);
  }
  datosvarios(){
    this.router.navigate(['/datos/grupal']);
  }
  agregar(){
    $("#addEmployeeModal").show()
   }
   cerrar(){
    $("#addEmployeeModal").hide()
   
  }
  cambiar_estado(){
   var grupo= $(".grupal").is(":hidden");
   var individual= $(".individual").is(":hidden");
   if(grupo){
    $(".grupal").show();
    $(".individual").hide();
    return;
   }
   if(individual){
    $(".grupal").hide();
    $(".individual").show();
    return;
   }
  
  }

  eliminar(id:number){
    this._userservice.deletActivity(id).subscribe(data=>console.log(data));
    Swal.fire(
      {title: 'Actividad Eliminada',
      text: "La Actividad Se Elimino Correctamente",
      icon: 'success',
      confirmButtonText: 'Continuar',
    }
    ).then(
      this.refresh
    );
    //
  }
  refresh(): void {
    window.location.reload(); 
 }

}
