import { Component,OnInit,OnChanges,AfterViewInit,DoCheck} from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';
import {WindowRef} from './WindowRef';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'saleor-app';
  token:string;
  isLoggedIn:Boolean=false;
  isLoginPage:Boolean=false;
  constructor(private appService: ApiService,private route: ActivatedRoute,private winRef: WindowRef) { 
    }
    ngOnInit(): void {
     

        this.token=localStorage.getItem('token')
        if(this.token)
        {
          this.isLoggedIn=true;
        }
        else
          this.isLoggedIn=false;
    }

    ngDoCheck()	
    {
      this.token=localStorage.getItem('token')
      if(this.token)
      {
        this.isLoggedIn=true;
      }
      else
        this.isLoggedIn=false;
  }    

  showAddress()
  {
    console.log("address")
  }
  showHistory(){
    console.log("show")
  }
    
    logout()
    {
      this.isLoggedIn=false;

localStorage.removeItem('token')
     
    }
  

  }

