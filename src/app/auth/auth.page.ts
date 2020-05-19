import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  LoadingController,
  AlertController,
  ToastController,
} from "@ionic/angular";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLoginMode: boolean = true;
  authorizedForApp: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _loadingController: LoadingController,
    private _alertController: AlertController,
    private _toastController: ToastController
  ) {}

  ngOnInit() {}

  // onLogin() {
  //   console.log("login");
  //   this._authService.login();

  //   /*  The loading Controller is responsible for showing the loading screen. It yields a promise that I handled
  //       with the .then() method. It gets the loading element and present it. After the timeout it dismiss the element
  //    */
  //   this._loadingController
  //     .create({
  //       keyboardClose: true,
  //       message: "Loading...",
  //       //duration: 1000
  //     })
  //     .then(loadingElement => {
  //       loadingElement.present();

  //       setTimeout(() => {
  //         loadingElement.dismiss();
  //         this._router.navigateByUrl("/main/tabs/news");
  //       }, 1000);
  //     });
  // }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const membershipNumber = form.value.membershipNumber;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      // if LOGIN mode: Post to API login and password

      this._authService.login(email, password).subscribe(
        data => {
          console.log(
            "Data returned from login.subscribe: " +
              JSON.stringify(data, null, 4)
          );
          this.authorizedForApp = data.authorized_for_app;

          // Only resets the form if user is able to login
          if (this.authorizedForApp) {
            form.reset();
          }
        },
        errorResponse => {
          let errorCode = errorResponse.status;
          //Error 401: Unauthorized
          if (errorCode === 401) {
            this.displayToast("Invalid Credentials");
          } else {
            this.displayToast("Unable to login");
          }
        }
      );
    } else {
      // console.log("Sign Up Mode");
      this._authService
        .signUp(membershipNumber, firstName, lastName, email, password)
        .subscribe(
          data => {
            form.reset();
            // this._router.navigateByUrl("/main/tabs/news");
          },
          errorResponse => {
            let errorCode = errorResponse.status;
            if (errorCode === 400) {
              this.displayToast("E-mail already registered");
            } else {
              this.displayToast("Unable to sign up");
            }
            return;
          }
        );
    }

    // if (!this.authorizedForApp) {
    //   console.log("not authorized");
    //   this.displayAlert();
    //   //TODO: Display allert that user is not authorized
    // } else {
    //   this._router.navigateByUrl("/main/tabs/news");
    // }
  }

  displayToast(message: string) {
    this._toastController
      .create({
        message: message,
        duration: 3000,
        color: "danger",
      })
      .then(toastElement => {
        toastElement.present();
      });
  }
}
