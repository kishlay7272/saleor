import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:any;
  email:any;
  firstName:any;
  lastName:any;
  constructor(private appService: ApiService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    let body=[
      {
          "operationName": "UserDetails",
          "variables": {},
          "query": "fragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment User on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  defaultShippingAddress {\n    ...Address\n    __typename\n  }\n  defaultBillingAddress {\n    ...Address\n    __typename\n  }\n  addresses {\n    ...Address\n    __typename\n  }\n  __typename\n}\n\nquery UserDetails {\n  me {\n    ...User\n    __typename\n  }\n}\n"
      }
  ]
  this.appService.userDetails(body).subscribe((data:any) => {
    console.log(data);
    this.users=data[0].data.me
    this.firstName=data[0].data.me.firstName;
    this.lastName=data[0].data.me.lastName;
    this.email=data[0].data.me.email



})
  }

  editUser()
  {
   let body= [
      {
          "operationName": "AccountUpdate",
          "variables": {
              "input": {
                  "firstName": this.firstName,
                  "lastName": this.lastName
              }
          },
          "query": "fragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment User on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  defaultShippingAddress {\n    ...Address\n    __typename\n  }\n  defaultBillingAddress {\n    ...Address\n    __typename\n  }\n  addresses {\n    ...Address\n    __typename\n  }\n  __typename\n}\n\nfragment AccountError on AccountError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation AccountUpdate($input: AccountInput!) {\n  accountUpdate(input: $input) {\n    errors: accountErrors {\n      ...AccountError\n      __typename\n    }\n    user {\n      ...User\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      {
          "operationName": "AccountUpdate",
          "variables": {
              "input": {
                  "firstName": "Niraj",
                  "lastName": "Guptaa"
              }
          },
          "query": "fragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment User on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  defaultShippingAddress {\n    ...Address\n    __typename\n  }\n  defaultBillingAddress {\n    ...Address\n    __typename\n  }\n  addresses {\n    ...Address\n    __typename\n  }\n  __typename\n}\n\nfragment AccountError on AccountError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation AccountUpdate($input: AccountInput!) {\n  accountUpdate(input: $input) {\n    errors: accountErrors {\n      ...AccountError\n      __typename\n    }\n    user {\n      ...User\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
  ]
  this.appService.editUser(body).subscribe((data:any) => {
    console.log(data);
    if(data.length)
    {
      this.appService.userDetails(body).subscribe((data1:any) => {
        console.log(data1);
        this.users=data1[0].data.me
        })
    }
   
    })
  
  }

}
