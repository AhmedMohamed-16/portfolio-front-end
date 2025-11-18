import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Skills {
  constructor(private _http:HttpClient){}
apiURL='http://localhost:3000/skill'

//httpclient
getSkill(){
const res = this._http.get<any>(this.apiURL)
return res
}
createSkill(data:any){
const res = this._http.post<any>(this.apiURL,data)
return res
}
updateSkill(id:string,data:any){
const res = this._http.patch<any>(`${this.apiURL}/${id}`,data)
return res
}
deleteSkill(id:string){
const res = this._http.delete<any>(`${this.apiURL}/${id}`)
return res
}
}
