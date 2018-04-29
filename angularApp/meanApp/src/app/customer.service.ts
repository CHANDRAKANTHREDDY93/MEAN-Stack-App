import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerService {

  constructor(private _http: HttpClient) { }

  getCustomerData() {
    return this._http.get('http://localhost:3000/api/customerdata')
                        .map(response  => response)
                         //.catch(this.handleError)
  }
  handleError(error: Response){
    console.log(error);
    return Observable.throw(error);
  }
}
