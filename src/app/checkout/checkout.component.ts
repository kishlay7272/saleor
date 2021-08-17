import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WindowRef } from '../WindowRef';
import { HttpHeaders } from '@angular/common/http';

// import * as Razorpay from 'razorpay';
import * as uuid from 'uuid';








@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userDetails: any;
  cart: Array<any> = [];
  sumTotal: number = 0;
  isCart: Boolean = false;
  isAddress: Boolean = false;
  isEmptyCart: Boolean = true;
  isShippingMethod: Boolean = false;
  isPayment: Boolean = false;
  isOrderCompleted: Boolean = false;
  userCheckoutDetails: Array<any> = [];
  shippingMethods: Array<any> = [];
  shippingMethodId: string;
  checkoutLine: Array<any> = [];
  paymentMethod: Array<any> = [];
  userCheckoutId: string;
  // rzp1:any;





  constructor(private appService: ApiService, private route: ActivatedRoute,private winRef: WindowRef) {
  }
  
  rzp1:any;
  orderId:string;
  paymentId:string;
  signature:string;
  paymentAuthorized:false;

public initPay(price):void {
  
 
let body={
  "amount": price.gross.amount*100,
  "currency": price.gross.currency,
  "receipt": uuid.v4()
}
this.appService.getOrderId(body).subscribe((data: any) => {
  console.log("orderId",data)
  this.orderId=data.id
  // localStorage.setItem('userCheckoutId', JSON.stringify(data[0].data.checkoutCreate.checkout.id))

if(data.id){
  console.log("vijay")
let options1 = {
 "key": "rzp_test_dY2y5J6BGs4TVO", // Enter the Key ID generated from the Dashboard
 "amount": price.gross.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
 "currency": "INR",
 "name": "Digi-Prex",
 "description": "Test Transaction",
 "image": "https://example.com/your_logo",
 "order_id": this.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
 "handler": function (response){
     alert(response.razorpay_payment_id);
     alert(response.razorpay_order_id);
     alert(response.razorpay_signature);
      console.log(response)
     this.orderId=response.razorpay_order_id
      this.paymentId=response.razorpay_payment_id
      this.signature= response.razorpay_signature
      this.paymentAuthorized=true
      localStorage.setItem('payment_id',JSON.stringify(response.razorpay_payment_id))
  

  
 },
 "prefill": {
     "name": "Kishlay Priyadarshi",
     "email": "kishlay0606@gmail.com",
     "contact": "9891559398"
 },
 "notes": {
     "address": "Razorpay Corporate Office"
 },
 "theme": {
     "color": "#3399cc"
 }
};
  this.rzp1 = new this.winRef.nativeWindow.Razorpay(options1);
  this.rzp1.open();
  
}

})
}

completeCheckoutPay1()
{
  let checkoutLine=JSON.parse(localStorage.getItem('checkoutLine'));
  let paymentGateway=checkoutLine[0].data.checkoutLinesUpdate.checkout.availablePaymentGateways[0].id
  this.cart = JSON.parse(localStorage.getItem('cart'));
    this.userCheckoutId = JSON.parse(localStorage.getItem('userCheckoutId'));
    this.paymentId=localStorage.getItem('payment_id')
    console.log("used payid",this.paymentId)

    // this.userCheckoutDetails.push(JSON.parse(localStorage.getItem('userCheckoutDetails')))


    let body = [
      {
        "operationName": "CreateCheckoutPayment",
        "variables": {
          "checkoutId": this.userCheckoutId,
          "paymentInput": {
            "amount": this.cart[0].totalPrice,
            "billingAddress": {
              "city": "KOLKATTA",
              "companyName": "digi-prex",
              "country": "IN",
              "countryArea": "West Bengal",
              "firstName": "Niraj",
              "lastName": "Gupta",
              "phone": "+918888888888",
              "postalCode": "700020",
              "streetAddress1": "purani bazar",
              "streetAddress2": "near kali temple"
            },
            "gateway": paymentGateway,
            "returnUrl": "http://localhost:3000/checkout/payment-confirm",
            "token": JSON.parse(localStorage.getItem('payment_id'))
          }
        },
        "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nfragment Payment on Payment {\n  id\n  gateway\n  token\n  creditCard {\n    brand\n    firstDigits\n    lastDigits\n    expMonth\n    expYear\n    __typename\n  }\n  total {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentError on PaymentError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation CreateCheckoutPayment($checkoutId: ID!, $paymentInput: PaymentInput!) {\n  checkoutPaymentCreate(checkoutId: $checkoutId, input: $paymentInput) {\n    checkout {\n      ...Checkout\n      __typename\n    }\n    payment {\n      ...Payment\n      __typename\n    }\n    errors: paymentErrors {\n      ...PaymentError\n      __typename\n    }\n    __typename\n  }\n}\n"
      }

    ]
    this.appService.completePayment(body).subscribe((data: any) => {
      console.log("pay", data);
  if(this.paymentId)
  {
           let body=[
      {
          "operationName": "CompleteCheckout",
          "variables": {
              "checkoutId": JSON.parse(localStorage.getItem('userCheckoutId'))
              },
          "query": "fragment OrderPrice on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment OrderDetail on Order {\n  userEmail\n  paymentStatus\n  paymentStatusDisplay\n  status\n  statusDisplay\n  id\n  token\n  number\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  lines {\n    productName\n    quantity\n    variant {\n      ...ProductVariant\n      __typename\n    }\n    unitPrice {\n      currency\n      ...OrderPrice\n      __typename\n    }\n    totalPrice {\n      currency\n      ...OrderPrice\n      __typename\n    }\n    __typename\n  }\n  subtotal {\n    ...OrderPrice\n    __typename\n  }\n  total {\n    ...OrderPrice\n    __typename\n  }\n  shippingPrice {\n    ...OrderPrice\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutError on CheckoutError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation CompleteCheckout($checkoutId: ID!, $paymentData: JSONString, $redirectUrl: String, $storeSource: Boolean) {\n  checkoutComplete(checkoutId: $checkoutId, paymentData: $paymentData, redirectUrl: $redirectUrl, storeSource: $storeSource) {\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    order {\n      ...OrderDetail\n      __typename\n    }\n    confirmationNeeded\n    confirmationData\n    __typename\n  }\n}\n"
      }
  ]
  this.appService.completeCheckoutPay(body).subscribe((data: any) => {
    console.log("comletecheckout",data)
    localStorage.setItem('complete', JSON.stringify(data))
  })
  }
  localStorage.removeItem('cart');
  this.isOrderCompleted=true;
  this.isCart=false;
  this.isAddress=false;
  this.isEmptyCart= false;
  this.isShippingMethod= false;
  this.isPayment= false;
})
}

  ngOnInit(): void {
    console.log(this.route.snapshot)
    if (this.route.snapshot.routeConfig.path == "checkout/address") {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (!this.cart.length) {
        this.isEmptyCart = true;
        this.isCart = false;
        this.isAddress = false;
      }
      else {
        this.isCart = false;
        this.isAddress = true;
        this.isEmptyCart = false;
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      }
    }
    if (this.route.snapshot.routeConfig.path == "checkout/shipping") {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.shippingMethods = JSON.parse(localStorage.getItem('checkoutLine'));
      console.log("shi", this.shippingMethods[0].data.checkoutLinesUpdate.checkout.availableShippingMethods)
      if (this.shippingMethods[0].data.checkoutLinesUpdate.checkout.availableShippingMethods.length) {
        this.isShippingMethod = true;
        this.isEmptyCart = false;
        this.isCart = false;
        this.isAddress = false;
      }
      // if (!this.cart.length) {
      //   this.isEmptyCart = true;
      //   this.isCart = false;
      //   this.isAddress = false;
      //   this.isShippingMethod=false;

      // }
    }
    if (this.route.snapshot.routeConfig.path == "checkout/payment") {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.checkoutLine = JSON.parse(localStorage.getItem('checkoutLine'));
      this.shippingMethods = JSON.parse(localStorage.getItem('checkoutLine'));
      this.shippingMethodId = localStorage.getItem('shippingMethodId');
      console.log(this.shippingMethodId)
      if (this.shippingMethods[0].data.checkoutLinesUpdate.checkout.availableShippingMethods.length) {
        this.isShippingMethod = false;
        this.isEmptyCart = false;
        this.isCart = false;
        this.isAddress = false;
        this.isPayment = true;

      }
      // if (!this.cart.length) {
      //   this.isEmptyCart = true;
      //   this.isCart = false;
      //   this.isAddress = false;
      //   this.isShippingMethod=false;

      // }
    }
    if (this.route.snapshot.routeConfig.path == "checkout") {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (!this.cart.length) {
        this.isEmptyCart = true;
      }
      else {
        this.isEmptyCart = false;
        this.isAddress = false;
        this.isCart = true;
        for (let key of this.cart) {
          this.sumTotal = this.sumTotal + key.totalPrice
        }
      }
    }
  }

  createCheckout() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));


    let body = [
      {
        "operationName": "CreateCheckout",
        "variables": {
          "checkoutInput": {
            "email": this.userDetails.data.me.email,
            "lines": [
              {
                "quantity": this.cart[0].quantity,
                "variantId": this.cart[0].product.variants[0].id
              }
            ],
            "shippingAddress": {
              "city": "KOLKATTA",
              "companyName": "digi-prex",
              "country": "IN",
              "countryArea": "West Bengal",
              "firstName": "Niraj",
              "lastName": "Gupta",
              "phone": "+918888888888",
              "postalCode": "700020",
              "streetAddress1": "purani bazar",
              "streetAddress2": "near kali temple"
            }
          }
        },
        "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutError on CheckoutError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {\n  checkoutCreate(input: $checkoutInput) {\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    checkout {\n      ...Checkout\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
    ]
    this.appService.createCheckout(body).subscribe((data: any) => {
      console.log("checkout",data)
      localStorage.setItem('userCheckoutId', JSON.stringify(data[0].data.checkoutCreate.checkout.id))
    })
  }

  selectShippingMethod(value) {
    this.shippingMethodId = value;
  }
  storeShippingId() {
    localStorage.setItem('shippingMethodId', JSON.stringify(this.shippingMethodId));
    this.shippingMethodId = JSON.parse(localStorage.getItem('shippingMethodId'));

    this.userCheckoutId = JSON.parse(localStorage.getItem('userCheckoutId'));

    let body = [
      {
        "operationName": "UpdateCheckoutShippingMethod",
        "variables": {
          "checkoutId": this.userCheckoutId,
          "shippingMethodId": this.shippingMethodId
        },
        "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutError on CheckoutError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation UpdateCheckoutShippingMethod($checkoutId: ID!, $shippingMethodId: ID!) {\n  checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {\n    checkout {\n      ...Checkout\n      __typename\n    }\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
    ]

    this.appService.createShipping(body).subscribe((data: any) => {
      console.log("ship", data);
    })

  }

  selectPaymentMethod(value) {
    console.log(value)
    let paymentMethod=
      {
        "id":"mirumee.payments.razorpay",
        "name":"Razorpay",
        "config":[{"field":"api_key","value":"rzp_test_dY2y5J6BGs4TVO","__typename":"GatewayConfigLine"},{"field":"store_customer_card","value":"false","__typename":"GatewayConfigLine"}],
        "currencies":["INR"],"__typename":"PaymentGateway"
      }
    
    localStorage.setItem('paymentMethod', JSON.stringify(value))

  }
  completePayment() {
    this.paymentMethod.push(JSON.parse(localStorage.getItem('paymentMethod')));
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.userCheckoutId = JSON.parse(localStorage.getItem('userCheckoutId'));

    // this.userCheckoutDetails.push(JSON.parse(localStorage.getItem('userCheckoutDetails')))


    let body = [
      {
        "operationName": "CreateCheckoutPayment",
        "variables": {
          "checkoutId": this.userCheckoutId,
          "paymentInput": {
            "amount": this.cart[0].totalPrice,
            "billingAddress": {
              "city": "KOLKATTA",
              "companyName": "digi-prex",
              "country": "IN",
              "countryArea": "West Bengal",
              "firstName": "Niraj",
              "lastName": "Gupta",
              "phone": "+918888888888",
              "postalCode": "700020",
              "streetAddress1": "purani bazar",
              "streetAddress2": "near kali temple"
            },
            "gateway": this.paymentMethod[0].id,
            "returnUrl": "http://localhost:3000/checkout/payment-confirm",
            "token": this.paymentId
          }
        },
        "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nfragment Payment on Payment {\n  id\n  gateway\n  token\n  creditCard {\n    brand\n    firstDigits\n    lastDigits\n    expMonth\n    expYear\n    __typename\n  }\n  total {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentError on PaymentError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation CreateCheckoutPayment($checkoutId: ID!, $paymentInput: PaymentInput!) {\n  checkoutPaymentCreate(checkoutId: $checkoutId, input: $paymentInput) {\n    checkout {\n      ...Checkout\n      __typename\n    }\n    payment {\n      ...Payment\n      __typename\n    }\n    errors: paymentErrors {\n      ...PaymentError\n      __typename\n    }\n    __typename\n  }\n}\n"
      }

    ]
    this.appService.completePayment(body).subscribe((data: any) => {
      console.log("pay", data);
      let body1 = [{
        "operationName": "CompleteCheckout",
        "variables": {
          "checkoutId": this.userCheckoutId,
        },
        "query": "fragment OrderPrice on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment OrderDetail on Order {\n  userEmail\n  paymentStatus\n  paymentStatusDisplay\n  status\n  statusDisplay\n  id\n  token\n  number\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  lines {\n    productName\n    quantity\n    variant {\n      ...ProductVariant\n      __typename\n    }\n    unitPrice {\n      currency\n      ...OrderPrice\n      __typename\n    }\n    totalPrice {\n      currency\n      ...OrderPrice\n      __typename\n    }\n    __typename\n  }\n  subtotal {\n    ...OrderPrice\n    __typename\n  }\n  total {\n    ...OrderPrice\n    __typename\n  }\n  shippingPrice {\n    ...OrderPrice\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutError on CheckoutError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation CompleteCheckout($checkoutId: ID!, $paymentData: JSONString, $redirectUrl: String, $storeSource: Boolean) {\n  checkoutComplete(checkoutId: $checkoutId, paymentData: $paymentData, redirectUrl: $redirectUrl, storeSource: $storeSource) {\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    order {\n      ...OrderDetail\n      __typename\n    }\n    confirmationNeeded\n    confirmationData\n    __typename\n  }\n}\n"
      }]
      this.appService.completeCheckout(body1).subscribe((data: any) => {
        console.log("pay1", data);
      })
      localStorage.removeItem('cart');
      this.isOrderCompleted=true;
      this.isCart=false;
      this.isAddress=false;
      this.isEmptyCart= false;
      this.isShippingMethod= false;
      this.isPayment= false;
    })
   
   

  }

  updateBillingAddress(key) {
    // this.userCheckoutDetails.push(JSON.parse(localStorage.getItem('userCheckoutDetails')))
    this.userCheckoutId = JSON.parse(localStorage.getItem('userCheckoutId'));

    let body = [              
      {
        "operationName": "UpdateCheckoutBillingAddress",
        "variables": {
          "billingAddress": {
            "city": key.city,
            "companyName": key.companyName,
            "country": key.country.code,
            "countryArea": key.countryArea,
            "firstName": key.firstName,
            "lastName": key.lastName,
            "phone": key.phone,
            "postalCode": key.postalCode,
            "streetAddress1": key.streetAddress1,
            "streetAddress2": key.streetAddress2
          },
          "checkoutId": this.userCheckoutId
        },
        "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutError on CheckoutError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation UpdateCheckoutBillingAddress($checkoutId: ID!, $billingAddress: AddressInput!) {\n  checkoutBillingAddressUpdate(checkoutId: $checkoutId, billingAddress: $billingAddress) {\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    checkout {\n      ...Checkout\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
    ]
    console.log(body)

    this.appService.updateBillingAddress(body).subscribe((data: any) => {
      console.log(data);


    })
  }


  updateShippingAddress(key) {
    // this.userCheckoutDetails.push(JSON.parse(localStorage.getItem('userCheckoutDetails')))
    this.userCheckoutId = JSON.parse(localStorage.getItem('userCheckoutId'));
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

    let body = [
      {
        "operationName": "UpdateCheckoutShippingAddress",
        "variables": {
          "checkoutId": this.userCheckoutId,
          "email": this.userDetails.data.me.email,
          "shippingAddress": {
            "city": key.city,
            "companyName": key.companyName,
            "country": key.country.code,
            "countryArea": key.countryArea,
            "firstName": key.firstName,
            "lastName": key.lastName,
            "phone": key.phone,
            "postalCode": key.postalCode,
            "streetAddress1": key.streetAddress1,
            "streetAddress2": key.streetAddress2
          }
        },
        "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutError on CheckoutError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation UpdateCheckoutShippingAddress($checkoutId: ID!, $shippingAddress: AddressInput!, $email: String!) {\n  checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    checkout {\n      ...Checkout\n      __typename\n    }\n    __typename\n  }\n  checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {\n    checkout {\n      ...Checkout\n      __typename\n    }\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
    ]

    this.appService.updateShippingAddress(body).subscribe((data: any) => {
      console.log(data);


    })
  }

}
