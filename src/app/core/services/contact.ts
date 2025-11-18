import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Contact {
  apiURL='http://localhost:3000/contact'
constructor(private _http:HttpClient){}
//httpclient
getContact(){
const res = this._http.get<any>(this.apiURL)
return res
}
createContact(data:any){
const res = this._http.post<any>(this.apiURL,data)
return res
}
createContactForm(data:any){
const res = this._http.post<any>(`${this.apiURL}/contact_form`,data)
return res
}
}
