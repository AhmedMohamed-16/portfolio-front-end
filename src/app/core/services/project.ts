import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Project {
  constructor(private _http:HttpClient){}
apiURL='http://localhost:3000/project'

//httpclient
getProject(){
const res = this._http.get<any>(this.apiURL)
return res
}
createProject(data:any){
const res = this._http.post<any>(this.apiURL,data)
return res
}
updateProject(id:string,data:any){
const res = this._http.patch<any>(`${this.apiURL}/${id}`,data)
return res
}
deleteProject(id:string){
const res = this._http.delete<any>(`${this.apiURL}/${id}`)
return res
}
}
