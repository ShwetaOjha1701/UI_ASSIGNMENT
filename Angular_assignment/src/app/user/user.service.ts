import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Assuming you have a User model
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // You can provide the service globally or in the module
})
export class UserService {
  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();

  setUser(user: any) {
    this.userSource.next(user);
  }
  obj:any={}
  private httpurl: string;
  isflag:any = false
  constructor(private http: HttpClient) {
    // Configure the API URL based on the environment
    this.httpurl = 'http://localhost:3000/user_details';
    console.log('API @ ' + this.httpurl + ' is being used.');
  }

  async getUsers() {
    let resp = await this.http.get<any>(this.httpurl + '/getuserdetails' ).toPromise().then(res => {
      return res;
    })

    return resp;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.httpurl}/${id}`);
  }
  async createUser(user: User) {
    let resp = await this.http.post<any>(this.httpurl + '/inser_user_details', user).toPromise().then(res => {
      return res;
    })

    return resp;
  }

  

  async updateUser(user:User,id:any) {
    let obj :any= {}
    obj['update_data']=user
    obj['id']=id
    let resp = await this.http.put<any>(this.httpurl + '/updateUser', obj ).toPromise().then(res => {
      return res;
    })

    return resp;
  }
  // updateUser(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.httpurl}/${id}`, user);
  // }

  async deleteUser(id:number) {
    let resp = await this.http.delete<any>(this.httpurl + '/deleteUser'+ JSON.stringify(id) ).toPromise().then(res => {
      return res;
    })

    return resp;
  }
}
