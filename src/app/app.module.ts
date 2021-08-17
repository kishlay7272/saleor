import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Ng2CompleterModule } from "ng2-completer";
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import {FormsModule} from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddressComponent } from './address/address.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserComponent } from './user/user.component';
import {WindowRef} from './WindowRef';





@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    AddressComponent,
    OrderHistoryComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,


    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {path: 'product', component: ProductComponent},
      {path: 'home', component: HomeComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'category/:id', component: CategoryComponent},
      {path: 'edit/:id', component: AddressComponent},

      {path: 'product/:id', component: ProductComponent},
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'checkout/address', component: CheckoutComponent},
      {path: 'checkout/shipping', component: CheckoutComponent},

      {path: 'checkout/payment', component: CheckoutComponent},
      {path: 'checkout/review', component: CheckoutComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'address', component: AddressComponent},
      {path: 'history', component: OrderHistoryComponent},
      {path: 'user', component: UserComponent}
















    ]),  ],
    providers: [ WindowRef ],
    bootstrap: [AppComponent]
})
export class AppModule { }
