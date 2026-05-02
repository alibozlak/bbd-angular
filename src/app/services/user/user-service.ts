import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { Observable } from 'rxjs';
import { ResponseBodyWithObject } from '../../models/response-body/response-body-with-object.model';
import { AddUserRequestDto } from '../../models/user/add-user-request.model';
import { ResponseBody } from '../../models/response-body/response-body.model';
import { ChangePasswordRequestDto } from '../../models/user/change-password-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private httpClient : HttpClient = inject(HttpClient);
  private userApiUrl : string = baseBbdApiUrl + "/users";

  public getStoreIdByUserId(userId : number) : Observable<ResponseBodyWithObject<number>> {
    return this.httpClient.post<ResponseBodyWithObject<number>>(`${this.userApiUrl}/get-store-id-by-user-id`, userId);
  }

  public addUser(addUserRequestDto : AddUserRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(this.userApiUrl, addUserRequestDto);
  }

  public changePassword(changePasswordRequestDto : ChangePasswordRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(`${this.userApiUrl}/change-password`, changePasswordRequestDto);
  }

  public getIsUserABbdTracker(userId : number) : Observable<ResponseBody> {
    return this.httpClient.get<ResponseBody>(`${this.userApiUrl}/is-user-a-bbd-tracker/${userId}`)
  }
}
