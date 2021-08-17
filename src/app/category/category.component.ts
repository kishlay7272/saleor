import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  id:any
  body:any
  products:any
  productList:any

  constructor(private appService: ApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.params['id']){
      this.id=this.route.snapshot.params['id'];
    this.body=[
      {
          "operationName": "CategoryProducts",
          "variables": {
              "attributes": {},
              "pageSize": 6,
              "priceGte": null,
              "priceLte": null,
              "sortBy": {"field": "MINIMAL_PRICE", "direction": "DESC"},
              "id": `${this.id}`
          },
          "query": "fragment BasicProductFields on Product {\n  id\n  name\n  thumbnail {\n    url\n    alt\n    __typename\n  }\n  thumbnail2x: thumbnail(size: 510) {\n    url\n    __typename\n  }\n  __typename\n}\n\nfragment Price on TaxedMoney {\n  gross {\n    amount\n    currency\n    __typename\n  }\n  net {\n    amount\n    currency\n    __typename\n  }\n  __typename\n}\n\nfragment ProductPricingField on Product {\n  pricing {\n    onSale\n    priceRangeUndiscounted {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    priceRange {\n      start {\n        ...Price\n        __typename\n      }\n      stop {\n        ...Price\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery CategoryProducts($id: ID, $attributes: [AttributeInput], $after: String, $pageSize: Int, $sortBy: ProductOrder, $priceLte: Float, $priceGte: Float) {\n  products(after: $after, first: $pageSize, sortBy: $sortBy, filter: {attributes: $attributes, categories: [$id], minimalPrice: {gte: $priceGte, lte: $priceLte}}) {\n    totalCount\n    edges {\n      node {\n        ...BasicProductFields\n        ...ProductPricingField\n        category {\n          id\n          name\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      __typename\n    }\n    __typename\n  }\n}\n"
      }]
      this.appService.getCategoryProducts(this.body).subscribe((data:any) => {
        this.products=data[0].data.products.edges;
      })
    }
    else{
      this.body=[
        {
            "operationName": "ProductsList",
            "variables": {},
            "query": "query ProductsList {\n  shop {\n    description\n    name\n    homepageCollection {\n      id\n      backgroundImage {\n        url\n        __typename\n      }\n      name\n      __typename\n    }\n    __typename\n  }\n  categories(level: 0, first: 4) {\n    edges {\n      node {\n        id\n        name\n        backgroundImage {\n          url\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
        }
    ]
      this.appService.getAllCateogaryProducts(this.body).subscribe((data:any) => {       
        this.productList=data[0];
    })
    }
   
   

  }
  // getCategoryProduct(body)
  // {
  //   this.appService.getCategoryProducts(body).subscribe((data:any) => {
  //     console.log(data);
  //   })
  // }

}
