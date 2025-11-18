import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHome } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class Home {

constructor(private _http:HttpClient){}
apiURL='http://localhost:3000/home'

//httpclient
getHome(){
const res = this._http.get<any>(this.apiURL)
return res
}
updateHome(data:IHome){
  console.log('inside service',data);
const res = this._http.patch<any>(this.apiURL,data)
return res
}
}
