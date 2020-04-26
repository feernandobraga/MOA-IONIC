import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoginMode: boolean = true

  constructor(
    private _authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
  }

  onLogin(){
    console.log("login")
    this._authService.login()
    // this._router.navigateByUrl('/main/tabs/news')
  }

  onSwitchAuthMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm){
    console.log(form)

  }

}
