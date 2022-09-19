import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { data } from 'jquery';
import {ServiceService} from '../services/service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { IUsers } from '../modelo/users';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})

export class PruebaComponent implements OnInit {
public users=[] as any;
public usersalone=[] as any;
public idnum=0;

private image:any;
constructor (private _userservice:ServiceService,    private router: Router){

}

  ngOnInit(): void {
   
  $("#editEmployeeModal").hide();
  this._userservice.getUsers()
    .subscribe(data=>this.users=data);
  }
 
  eliminar(id:number){
    this._userservice.deletUser(id).subscribe(data=>console.log(data));
    Swal.fire(
      {title: 'Usuario Eliminado',
      text: "El Usuario Se Elimino Correctamente",
      icon: 'success',
      confirmButtonText: 'Continuar',
    }
    ).then(
     this.refresh
    );
    //this.refresh();

  }
  usuario_id(usuario:IUsers,form:NgForm){
    this.idnum=usuario.Id_Usuario;
    console.log(form.value)
    form.setValue({
      apellido1: usuario.Apellidos,
      correo1: usuario.Correo,
      facultad1: usuario.Facultad,
      nombre1: usuario.Nombres,
      numero_documento1: usuario.Numero_Documento,
      programa1: usuario.Programa,
      tipo_documento1: usuario.Tipo_documento,
      contrasena1:''
    });
    this.editar();
  }
  actualizar_usuario(form: NgForm){
    this._userservice.updateuser(form.value,this.idnum)
      .subscribe(res=>{
        console.log(res);
      });
      Swal.fire(
        {title: 'Usuario Actualizado',
        text: "El Usuario Se Actualizo Correctamente",
        icon: 'success',
        confirmButtonText: 'Continuar',
      }
      ).then(
       this.refresh
      );
  }

  
  refresh(): void {
     window.location.reload(); 
  }
  onUploadFinish(event) {
    this.image=new ImageSelected;
    this.image.image=event.src;
    this.image.name=event.file.name;
   }

   sendImage(nombre){
     var completo=this.image.name;
     var dividir=completo.split(".")
     var names=nombre+"."+dividir[1];


     if(this.image!=null){
       this._userservice.postimagen({ file:this.image.image,name:names},
        {headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Access-Control-Allow-Origin': '*'
      },}
      ).subscribe((d)=>{console.log(d);
        })
     }
   }
  
  agregar_usuario(form: NgForm){
   
    var text=$(".tipo_documento option:selected").text();
    
    var datos=Object.assign(form.value,{
      tipo_documento:text
    })
    
   
    this.sendImage(form.value.numero_documento);
    
   this._userservice.postUsers(datos)
    .subscribe(res=>{
      console.log(res);
    });
    Swal.fire(
      {title: 'Usuario Agregado',
      text: "El Usuario Se Agrego Correctamente",
      icon: 'success',
      confirmButtonText: 'Continuar',
    }
    ).then(
     this.refresh
    );
    
  }
  limpiar(form?:NgForm){
    
    if(form){
      form.reset();

    }
  }

  agregar(){
   //$("#addEmployeeModal").css("display: block;");
   $("#addEmployeeModal").show()
  }
  cerrar(){
    $("#addEmployeeModal").hide()
    $("#editEmployeeModal").hide()
  }
  editar(){
    $("#editEmployeeModal").show()
  }


 
  
  

}

class ImageSelected{
  public name:String;
  public image:String;

  constructor(){
    this.name="";
    this.image="";
  }
}

