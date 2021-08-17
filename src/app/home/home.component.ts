import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mainMenu:any;
  featuredproducts:any;
  productList:any;
  secondarMenu:any;
  userDetails:any;
  userCheckoutDetails:any;

  constructor(private appService: ApiService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {

    let body=[
      
      {
          "operationName": "MainMenu",
          "variables": {},
          "query": "fragment MainMenuSubItem on MenuItem {\n  id\n  name\n  category {\n    id\n    name\n    __typename\n  }\n  url\n  collection {\n    id\n    name\n    __typename\n  }\n  page {\n    slug\n    __typename\n  }\n  parent {\n    id\n    __typename\n  }\n  __typename\n}\n\nquery MainMenu {\n  shop {\n    navigation {\n      main {\n        id\n        items {\n          ...MainMenuSubItem\n          children {\n            ...MainMenuSubItem\n            children {\n              ...MainMenuSubItem\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      {
          "operationName": "FeaturedProducts",
          "variables": {},
          "query": "fragment BasicProductFields on Product {\n  id\n  name\n  thumbnail {\n    url\n    alt\n    __typename\n  }\n  thumbnail2x: thumbnail(size: 510) {\n    url\n    __typename\n  }\n  __typename\n}\n\nfragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductPricingField on Product {\n  pricing {\n    onSale\n    priceRangeUndiscounted {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    priceRange {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery FeaturedProducts {\n  shop {\n    homepageCollection {\n      id\n      products(first: 20) {\n        edges {\n          node {\n            ...BasicProductFields\n            ...ProductPricingField\n            category {\n              id\n              name\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      {
          "operationName": "ProductsList",
          "variables": {},
          "query": "query ProductsList {\n  shop {\n    description\n    name\n    homepageCollection {\n      id\n      backgroundImage {\n        url\n        __typename\n      }\n      name\n      __typename\n    }\n    __typename\n  }\n  categories(level: 0, first: 4) {\n    edges {\n      node {\n        id\n        name\n        backgroundImage {\n          url\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      {
          "operationName": "SecondaryMenu",
          "variables": {},
          "query": "fragment SecondaryMenuSubItem on MenuItem {\n  id\n  name\n  category {\n    id\n    name\n    __typename\n  }\n  url\n  collection {\n    id\n    name\n    __typename\n  }\n  page {\n    slug\n    __typename\n  }\n  __typename\n}\n\nquery SecondaryMenu {\n  shop {\n    navigation {\n      secondary {\n        items {\n          ...SecondaryMenuSubItem\n          children {\n            ...SecondaryMenuSubItem\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
     {
          "operationName": "UserDetails",
          "variables": {},
          "query": "fragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment User on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  defaultShippingAddress {\n    ...Address\n    __typename\n  }\n  defaultBillingAddress {\n    ...Address\n    __typename\n  }\n  addresses {\n    ...Address\n    __typename\n  }\n  __typename\n}\n\nquery UserDetails {\n  me {\n    ...User\n    __typename\n  }\n}\n"
      },
      {
        "operationName": "UserCheckoutDetails",
        "variables": {},
        "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nquery UserCheckoutDetails {\n  me {\n    id\n    checkout {\n      ...Checkout\n      __typename\n    }\n    __typename\n  }\n}\n"
    }

  ]
  this.appService.getAllCateogaryProducts(body).subscribe((data:any) => {
    console.log(data);
    this.mainMenu = data[0];
    this.featuredproducts=data[1];
    this.productList=data[2];
    this.secondarMenu=data[3];
    this.userDetails=data[4];
    this.userCheckoutDetails=data[5];
    localStorage.setItem("userDetails",JSON.stringify(this.userDetails));
    localStorage.setItem("userCheckoutDetails",JSON.stringify(this.userCheckoutDetails));

    // create the source

})

  }

}
