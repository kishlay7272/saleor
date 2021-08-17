import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { keyframes } from '@angular/animations';

// import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
// import { Ng2CompleterModule } from "ng2-completer";



@Component({
  selector: 'app-product',
  // templateUrl: './product.component.html'
  templateUrl:'./product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  users : any;
  id:any;
  body:any;
  product:any;
 quantity:number =1;
  price:number;
  cartArray: Array<any>=[]
  cartObject:object={};
  userCheckoutDetails:Array<any>=[];


  // source: LocalDataSource;
  // public data;
  
  constructor(private appService: ApiService,private route: ActivatedRoute,) { 
  }
  

  ngOnInit(): void {
    // localStorage.seItem('cart',JSON.stringify(this.cartArray))


    if(this.route.snapshot.params['id']){
      this.id=this.route.snapshot.params['id'];

      this.body=[
        {
            "operationName": "ProductDetails",
            "variables": {
                "id": `${this.id}`
            },
            "query": "fragment BasicProductFields on Product {\n  id\n  name\n  thumbnail {\n    url\n    alt\n    __typename\n  }\n  thumbnail2x: thumbnail(size: 510) {\n    url\n    __typename\n  }\n  __typename\n}\n\nfragment SelectedAttributeFields on SelectedAttribute {\n  attribute {\n    id\n    name\n    __typename\n  }\n  values {\n    id\n    name\n    __typename\n  }\n  __typename\n}\n\nfragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariantFields on ProductVariant {\n  id\n  sku\n  name\n  isAvailable\n  quantityAvailable(countryCode: $countryCode)\n  images {\n    id\n    url\n    alt\n    __typename\n  }\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      slug\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ProductPricingField on Product {\n  pricing {\n    onSale\n    priceRangeUndiscounted {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    priceRange {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery ProductDetails($id: ID!, $countryCode: CountryCode) {\n  product(id: $id) {\n    ...BasicProductFields\n    ...ProductPricingField\n    descriptionJson\n    category {\n      id\n      name\n      products(first: 3) {\n        edges {\n          node {\n            ...BasicProductFields\n            ...ProductPricingField\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    images {\n      id\n      alt\n      url\n      __typename\n    }\n    attributes {\n      ...SelectedAttributeFields\n      __typename\n    }\n    variants {\n      ...ProductVariantFields\n      __typename\n    }\n    seoDescription\n    seoTitle\n    isAvailable\n    isAvailableForPurchase\n    availableForPurchase\n    __typename\n  }\n}\n"
        }
    ]

     this.appService.getProductDetails(this.body).subscribe((data:any) => {
      console.log(data);
      this.product = data[0].data.product; // create the source


  })
    

    }
    else{
    let body=[
      {
          "operationName": "CategoryProducts",
          "variables": {
              "attributes": {},
              "pageSize": 6,
              "priceGte": null,
              "priceLte": null,
              "sortBy": {"field": "MINIMAL_PRICE", "direction": "DESC"},
              "id": "Q2F0ZWdvcnk6MQ=="
          },
          "query": "fragment BasicProductFields on Product {\n  id\n  name\n  thumbnail {\n    url\n    alt\n    __typename\n  }\n  thumbnail2x: thumbnail(size: 510) {\n    url\n    __typename\n  }\n  __typename\n}\n\nfragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductPricingField on Product {\n  pricing {\n    onSale\n    priceRangeUndiscounted {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    priceRange {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery CategoryProducts($id: ID, $attributes: [AttributeInput], $after: String, $pageSize: Int, $sortBy: ProductOrder, $priceLte: Float, $priceGte: Float) {\n  products(after: $after, first: $pageSize, sortBy: $sortBy, filter: {attributes: $attributes, categories: [$id], minimalPrice: {gte: $priceGte, lte: $priceLte}}) {\n    totalCount\n    edges {\n      node {\n        ...BasicProductFields\n        ...ProductPricingField\n        category {\n          id\n          name\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      {
          "operationName": "Category",
          "variables": {
              "attributes": {},
              "pageSize": 6,
              "priceGte": null,
              "priceLte": null,
              "sortBy": null,
              "id": "Q2F0ZWdvcnk6MQ=="
          },
          "query": "query Category($id: ID) {\n  category(id: $id) {\n    seoDescription\n    seoTitle\n    id\n    name\n    backgroundImage {\n      url\n      __typename\n    }\n    ancestors(last: 5) {\n      edges {\n        node {\n          id\n          name\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  attributes(filter: {inCategory: $id, filterableInStorefront: true}, first: 100) {\n    edges {\n      node {\n        id\n        name\n        slug\n        values {\n          id\n          name\n          slug\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
  ]
    this.appService.getAllCateogaryProducts(body).subscribe((data:any) => {
      console.log(data);
      this.users = data; // create the source


  })
}

}
addQuantity()
{
   this.quantity+=1;
  //  return quantity;
}

subtractQuantity()
{
  if(this.quantity==0)
  return this.quantity
  if(this.quantity>0)
  this.quantity-=1;
}
updateQuantity(value)
{
  // console.log("a",value)
  // this.quantity=value;
  console.log(this.quantity)
}




addToCart(pid,vid)
{
  if(!localStorage.getItem('cart')){
      this.cartObject={
      id:this.id,
      basePrice:this.product.pricing.priceRange.start.gross.amount,
      totalPrice:this.product.pricing.priceRange.start.gross.amount * this.quantity,
      product:this.product,
      quantity:this.quantity
    }
    this.cartArray.push(this.cartObject);
    localStorage.setItem("cart",JSON.stringify(this.cartArray));


  }
  else{ 
  this.cartArray=JSON.parse(localStorage.getItem('cart'))
  console.log(this.cartArray);

  if(this.cartArray.length){
    let found=0;
  for(let key of this.cartArray)
  {
    if(key.id==pid)
    {
      key.totalPrice=this.quantity*key.basePrice,
    key.quantity=this.quantity
    found=1;
    localStorage.setItem('cart',JSON.stringify(this.cartArray));

    

    }
  }
  if(found==0)
  {
    this.cartObject={
      id:this.id,
      basePrice:this.product.pricing.priceRange.start.gross.amount,
      totalPrice:this.product.pricing.priceRange.start.gross.amount * this.quantity,
      product:this.product,
      quantity:this.quantity
    }
    this.cartArray.push(this.cartObject);
    localStorage.setItem("cart",JSON.stringify(this.cartArray));

  }
  
}
}
this.userCheckoutDetails.push(JSON.parse(localStorage.getItem('userCheckoutDetails')))

let body=[
  {
      "operationName": "UpdateCheckoutLine",
      "variables": {
        "checkoutId": this.userCheckoutDetails[0].data.me.checkout.id,
        "lines": [
              {
                  "quantity": this.quantity,
                  "variantId": vid
              }
          ]
      },
      "query": "fragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductVariant on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  isAvailable\n  pricing {\n    onSale\n    priceUndiscounted {\n      ...Price\n      __typename\n    }\n    price {\n      ...Price\n      __typename\n    }\n    __typename\n  }\n  attributes {\n    attribute {\n      id\n      name\n      __typename\n    }\n    values {\n      id\n      name\n      value: name\n      __typename\n    }\n    __typename\n  }\n  product {\n    id\n    name\n    thumbnail {\n      url\n      alt\n      __typename\n    }\n    thumbnail2x: thumbnail(size: 510) {\n      url\n      __typename\n    }\n    productType {\n      id\n      isShippingRequired\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutLine on CheckoutLine {\n  id\n  quantity\n  totalPrice {\n    ...Price\n    __typename\n  }\n  variant {\n    ...ProductVariant\n    __typename\n  }\n  __typename\n}\n\nfragment Address on Address {\n  id\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  postalCode\n  country {\n    code\n    country\n    __typename\n  }\n  countryArea\n  phone\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  __typename\n}\n\nfragment ShippingMethod on ShippingMethod {\n  id\n  name\n  price {\n    currency\n    amount\n    __typename\n  }\n  __typename\n}\n\nfragment PaymentGateway on PaymentGateway {\n  id\n  name\n  config {\n    field\n    value\n    __typename\n  }\n  currencies\n  __typename\n}\n\nfragment Checkout on Checkout {\n  token\n  id\n  totalPrice {\n    ...Price\n    __typename\n  }\n  subtotalPrice {\n    ...Price\n    __typename\n  }\n  billingAddress {\n    ...Address\n    __typename\n  }\n  shippingAddress {\n    ...Address\n    __typename\n  }\n  email\n  availableShippingMethods {\n    ...ShippingMethod\n    __typename\n  }\n  shippingMethod {\n    ...ShippingMethod\n    __typename\n  }\n  shippingPrice {\n    ...Price\n    __typename\n  }\n  lines {\n    ...CheckoutLine\n    __typename\n  }\n  isShippingRequired\n  discount {\n    currency\n    amount\n    __typename\n  }\n  discountName\n  translatedDiscountName\n  voucherCode\n  availablePaymentGateways {\n    ...PaymentGateway\n    __typename\n  }\n  __typename\n}\n\nfragment CheckoutError on CheckoutError {\n  code\n  field\n  message\n  __typename\n}\n\nmutation UpdateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {\n  checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {\n    checkout {\n      ...Checkout\n      __typename\n    }\n    errors: checkoutErrors {\n      ...CheckoutError\n      __typename\n    }\n    __typename\n  }\n}\n"
  }
]
this.appService.checkoutLine(body).subscribe((data:any) => {
  console.log(data);
  localStorage.setItem("checkoutLine",JSON.stringify(data));

})
}
}
