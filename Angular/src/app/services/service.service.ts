import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IUsers } from '../modelo/users';
import {IActivity} from '../modelo/activity'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  


  constructor(private http:HttpClient) { }

  getUsers():Observable<IUsers[]>{
    return this.http.get<IUsers[]>("http://localhost:3000/users")
  }

  getactivity():Observable<IActivity[]>{
    return this.http.get<IActivity[]>("http://localhost:3000/activitys")
  }
  getactivitygrupal():Observable<IActivity[]>{
    return this.http.get<IActivity[]>("http://localhost:3000/activitygrupal")
  }
  deletUser(id:number){
    return this.http.delete("http://localhost:3000/deleteuser/"+id);
  }
  deletActivity(id:number){
    return this.http.delete("http://localhost:3000/deleteactivity/"+id);
  }

  
  postUsers(users:IUsers){
    return this.http.post("http://localhost:3000/users",users);
  }

  postmultiimagen(obj,id){
    return this.http.post<any>("http://localhost:3000/uploadimg/"+id,obj);
    
  }
  postActivity(obs){
    return this.http.post("http://localhost:3000/activity",obs);
  }
  postimagen(us,head){
    return this.http.post("http://localhost:3000/image",us,head);
  }
  getUsersalone(id:number):Observable<IUsers[]>{
    return this.http.get<IUsers[]>("http://localhost:3000/users/"+id);
  }
  getActivityalone(id:number):Observable<IActivity[]>{
    return this.http.get<IActivity[]>("http://localhost:3000/activity/"+id);
  }
  updateuser(users:IUsers,id:number){
    return this.http.put("http://localhost:3000/updateuser/"+id,users);
  }

  postsesion(a){
    return this.http.post("http://localhost:3000/sesion",a);
  }

  pdfdownload(id){
    return this.http.get("http://localhost:3000/pdf/"+id);
  }


}
