import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Footer {
  constructor(private _http:HttpClient){}
apiURL='http://localhost:3000/footer'

//httpclient
getFooter(){
const res = this._http.get<any>(this.apiURL)
return res
}
createFooter(data:any){
const res = this._http.post<any>(this.apiURL,data)
return res
}
deleteLink(id:string){
const res = this._http.delete<any>(`${this.apiURL}/link/${id}`)
return res
}

}
