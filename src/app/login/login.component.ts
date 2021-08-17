import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   email:string;
   password:string;
   confirmPassword:string;
   isRegistrationSuccessful:Boolean=false;

   isLoginSuccessful:Boolean=false;
  constructor(private appService: ApiService,public router: Router) {
  }
  ngOnInit(): void {
  }
  login()
  {
    console.log(this.email)
    let body=[
      {
          "operationName": "TokenAuth",
          "variables": {
              "email": this.email,
              "password": this.password
          },
          "query": "fragment AccountError on AccountError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation TokenAuth($email: String!, $password: String!) {\n  tokenCreate(email: $email, password: $password) {\n    csrfToken\n    refreshToken\n    token\n    errors: accountErrors {\n      ...AccountError\n      __typename\n    }\n    user {\n      id\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
  ]
  this.appService.login(body).subscribe((data: any) => {
    console.log("login", data);
    if(data[0].data.tokenCreate.errors.length)
    {
      this.isLoginSuccessful=false;
      alert(data[0].data.tokenCreate.errors[0].code)
    
    }
    else{
      localStorage.setItem('token',JSON.stringify(data[0].data.tokenCreate))
    this.isLoginSuccessful=true;
    this.router.navigate(['home'])
    

    }
     

    
  })

  }


  signup()
  {
if(this.password==this.confirmPassword)  { 
    let body=[
      {
          "operationName": "RegisterAccount",
          "variables": {
              "email": this.email,
              "password": this.password,
              "redirectUrl": "http://localhost:3000/account-confirm/"
          },
          "query": "mutation RegisterAccount($email: String!, $password: String!, $redirectUrl: String!) {\n  accountRegister(input: {email: $email, password: $password, redirectUrl: $redirectUrl}) {\n    errors {\n      field\n      message\n      __typename\n    }\n    requiresConfirmation\n    __typename\n  }\n}\n"
      }
  ]
  this.appService.signup(body).subscribe((data: any) => {
    console.log("signup", data);
    if(data[0].data.accountRegister.errors.length)
    {
      this.isRegistrationSuccessful=false;
      alert(data[0].data.accountRegister.errors[0].message)
    }
    else{
      this.isRegistrationSuccessful=true;
      alert("Registration Successfull")
       this.toggleForm();
    }
     

    
  })
}
else{
  alert("password does not match")
}
  }
 toggleForm() {
  const container = document.querySelector('.container');
  console.log(container)
  container.classList.toggle('active');
};

}
