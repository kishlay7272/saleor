import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import axios from "axios";
import { AxiosInstance } from "axios";




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosClient: AxiosInstance;


  constructor(private http: HttpClient) {
    this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
				'Authorization': 'Basic ' + 'cnpwX3Rlc3RfZFkyeTVKNkJHczRUVk86bVFVNXhHTDRPODNITHc1eEZ1amhYQ2pE',
        'Content-Type': 'application/json'
			}
		});
  }
  public getAllCateogaryProducts(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public getCategoryProducts(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public checkoutLine(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }
  public updateAddress(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public showHistory(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public userDetails(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public editUser(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }
  public getOrderId(body): Observable<any> {
    return this.http.post(
      `http://localhost:2000/order`, body
    );

    // return this.http.post(
    //   `https://api.razorpay.com/v1/orders`, body, httpOptions
    // );
  }

  public completeCheckoutPay(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public updateBillingAddress(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }
  public completePayment(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }
  public completeCheckout(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public updateShippingAddress(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public createCheckout(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public createShipping(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }
  public login(body): Observable<any> {
    let headers = new HttpHeaders();
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public signup(body): Observable<any> {
    let headers = new HttpHeaders();
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }

  public getProductDetails(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );
  }


  public homePageData(body): Observable<any> {
    let tokenStored = JSON.parse(localStorage.getItem('token'));
    let token = `JWT ${tokenStored.token}`; let headers = new HttpHeaders();
    headers = headers.set('Authorization', token)
    return this.http.post(
      `http://localhost:8000/graphql/`, body, { headers: headers }
    );

  }
}
