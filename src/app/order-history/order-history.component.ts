import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
 body:any;
 order:Array<any>;
  constructor(private appService: ApiService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    let body=[
      {
          "operationName": "OrdersByUser",
          "variables": {
              "perPage": 5
          },
          "query": "query OrdersByUser($perPage: Int!, $after: String) {\n  me {\n    id\n    orders(first: $perPage, after: $after) {\n      pageInfo {\n        hasNextPage\n        endCursor\n        __typename\n      }\n      edges {\n        node {\n          id\n          token\n          number\n          statusDisplay\n          created\n          total {\n            gross {\n              amount\n              currency\n              __typename\n            }\n            net {\n              amount\n              currency\n              __typename\n            }\n            __typename\n          }\n          lines {\n            id\n            variant {\n              id\n              product {\n                name\n                id\n                __typename\n              }\n              __typename\n            }\n            thumbnail {\n              alt\n              url\n              __typename\n            }\n            thumbnail2x: thumbnail(size: 510) {\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
  ]
  this.appService.showHistory(body).subscribe((data: any) => {
    console.log(data);
    this.order=data[0].data.me.orders.edges


  })
  }

}
