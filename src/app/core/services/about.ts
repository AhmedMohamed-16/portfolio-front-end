import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAbout } from '../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class About {

constructor(private _http:HttpClient){}
apiURL='http://localhost:3000/about'

//httpclient
getAbout(){
const res = this._http.get<any>(this.apiURL)
return res
}
updateAbout(data:any){
const res = this._http.patch<any>(this.apiURL,data)
return res
}
getTechs(){
const res = this._http.get<any>(`${this.apiURL}/tech`)
return res
}
updateTechs(data:[]){
const res = this._http.post<any>(`${this.apiURL}/techs`,data)
return res
}
}
