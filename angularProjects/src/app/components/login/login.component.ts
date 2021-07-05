import { Component, OnInit } from '@angular/core';
import { loginClass } from '../loginClass';
import { Login } from './login.serivce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login!: loginClass[];

  constructor(private _login: Login, private _router: Router) { }

  ngOnInit(): void {

    this._login.getLogin()
    .subscribe
    (
      data=> 
      {
        this.login = data;
        console.log(data);
      }
    )
  }

  public checkLogin(){
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;

    this._login.getLogin()
    .subscribe
    (
      data=> 
      {
        this.login = data;

        this.login.forEach(element => {
          if(element.email == email && element.lozinka == password)
          {
            alert("Uspješno ste se prijavili!");
            this._router.navigateByUrl('/projekti_pocetna');
          }
          else
          {
            alert("Uneseni podaci nisu ispravni")!
          }
        });
      }
    )
  }
}
