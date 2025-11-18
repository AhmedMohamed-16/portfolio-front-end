import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Submissions {
 apiURL:string = 'http://localhost:3000/contact/contact_form';
 constructor(private _http:HttpClient){}
getSubmissions(): Observable<any> {
return this._http.get(this.apiURL)
}
}
