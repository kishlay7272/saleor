import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userDetails: any;
  id: any;
  body:any

  city: any;
  companyName: any;
  countryArea: any;
  firstName: any;
  lastName: any;
  country: any;
  phone: any;
  postalCode: any;
  streetAddress1: any;
  streetAddress2: any;


  constructor(private appService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      
    }
  }
  editAddress(key) {
    console.log(key)

    let body = [
      {
        "operationName": "UpdateUserAddress",
        "variables": {
          "id": key.id,
          "input": {
            "city": this.city,
            "companyName": this.companyName,
            "countryArea": this.countryArea,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "country":this.country,
            "phone": this.phone,
            "postalCode": this.postalCode,
            "streetAddress1": this.streetAddress1,
            "streetAddress2": this.streetAddress2
          }
        },
        "query": "fragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment User on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  defaultShippingAddress {\n    ...Address\n    __typename\n  }\n  defaultBillingAddress {\n    ...Address\n    __typename\n  }\n  addresses {\n    ...Address\n    __typename\n  }\n  __typename\n}\n\nfragment AccountError on AccountError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation UpdateUserAddress($input: AddressInput!, $id: ID!) {\n  accountAddressUpdate(input: $input, id: $id) {\n    errors: accountErrors {\n      ...AccountError\n      __typename\n    }\n    user {\n      ...User\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
    ]
    this.appService.updateAddress(this.body).subscribe((data:any) => {       
console.log(data)  })


  }
  defaultAddress(key)
  {
     this.city=key.city,
    this.companyName=key.companyName,
    this.countryArea= key.countryArea,
    this.firstName= key.firstName,
    this.lastName=key.lastName,
    this.country=key.country,
    this.phone= key.phone,
    this.postalCode= key.postalCode,
    this.streetAddress1= key.streetAddress1,
    this.streetAddress2=key.streetAddress2
  }

}
