import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../services/service.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
public activiy:any;
public users=[] as any;
  constructor(
    private router: Router,private _userservice:ServiceService
  ) {
console.log("hola")
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
  ]

  ngOnInit(): void {
    
    
    
  }

  datos(){
    this.router.navigate(['/datos']);
  }
  

}
