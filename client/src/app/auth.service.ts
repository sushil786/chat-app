import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl ='http://localhost:8000/users/register';
  private _loginUrl ='http://localhost:8000/users/login';
  constructor(private _http : HttpClient,private _router : Router) { }

  //Register user service
  registerUser(user){
    return this._http.post<any>(this._registerUrl, user)
  }

  //Lohin user service
  loginUser(user){
    return this._http.post<any>(this._loginUrl,user)
  }

  //return true if the token is present in the browser
  loggedIn(){
    return !!localStorage.getItem('token')
  }

  //remove token on logout of user
  logOut(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
