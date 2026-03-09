import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginRequestModel } from '../../models/login/login-request.model';
import { Observable, tap } from 'rxjs';
import { AuthResponseModel } from '../../models/login/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private httpClient = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/auth";
  public isAuthenticated = signal<boolean>(false);
  
  public login(loginRequestModel : LoginRequestModel) : Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>(`${this.apiUrl}/login`, loginRequestModel)
    .pipe(
      tap((response) => {
        this.isAuthenticated.set(true);
        localStorage.setItem('accessToken', response.accessToken);
        
        if (response.isUserAdmin) {
          localStorage.setItem('role', "admin");
        } else {
          localStorage.setItem('role', "user");
        }
      })
    );
  }

  public logout() : void {
    this.isAuthenticated.set(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  }

}
