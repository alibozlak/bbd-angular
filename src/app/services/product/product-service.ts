import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { AddOrUpdateProductRequestDto } from '../../models/product/add-or-update-product-request.model';
import { Observable } from 'rxjs';
import { ResponseBody } from '../../models/response-body/response-body.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private httpClient : HttpClient = inject(HttpClient);
  private apiUrl = baseBbdApiUrl + "/products"

  public addProduct(addProductRequestDto : AddOrUpdateProductRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(`${this.apiUrl}`, addProductRequestDto);
  }
  
}
