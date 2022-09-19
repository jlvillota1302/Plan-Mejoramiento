import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  is_error = false;

  user = {
    usr: "admin",
    pass: "123"
  };

  ngOnInit(): void {
  }

  validarUsuario() {
    console.log(this.user)
    if (this.user.usr == 'admin' && this.user.pass == '123') {
    
      this.router.navigate(['/principal']);
      this.is_error = false;
    }
    else {
      this.is_error = true;
    }
  }

}
