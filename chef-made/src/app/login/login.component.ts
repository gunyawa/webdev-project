import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username:string = "";
  password:string = "";
  error:boolean = false;
  constructor(private loginService:LoginService, private router:Router) {
  }
  ngOnInit() {
  }
  login(){
    this.loginService.login(this.username,this.password).subscribe((data) => {
      localStorage.setItem('token' ,data.token);
      if(data.token){
        this.loginService.isAuthenticatedSubject.next(true);
        this.router.navigate(['favorites'])
      }
    },
      error => {
        this.error = true;
      })
  }
}
