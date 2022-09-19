import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ServiceService} from '../services/service.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-inicios',
  templateUrl: './inicios.component.html',
  styleUrls: ['./inicios.component.css']
})
export class IniciosComponent implements OnInit {
public valor:any
  constructor(
    private router: Router,private _userservice:ServiceService
  ) { }

  is_error = false;

  user = {
    usr: "admin",
    pass: "123"
  };

  ngOnInit(): void {
    console.log("this"+localStorage.getItem('currentUser'));
  }

  sesion(form:NgForm){

this._userservice.postsesion(form.value).subscribe(dato=>{
  this.valor=dato;
  if(this.valor.data!="fail"){
    this.router.navigate(['/principal']);
    localStorage.setItem('currentUser',this.valor.data);
  }else{
    window.location.reload(); 
  }
 
});
  }

  validarUsuario() {
    console.log(this.user)
    if (this.user.usr == 'admin' && this.user.pass == '123') {
    
     
      this.is_error = false;
    }
    else {
      this.is_error = true;
    }
  }
}
