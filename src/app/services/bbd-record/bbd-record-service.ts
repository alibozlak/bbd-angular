import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { AddBbdRecordRequestDto } from '../../models/bbd-record/add-bbd-record-request.model';
import { Observable } from 'rxjs';
import { ResponseBody } from '../../models/response-body/response-body.model';
import { SaleProductRequestDto } from '../../models/bbd-record/sale-product-request.model';

@Injectable({
  providedIn: 'root',
})
export class BbdRecordService {

  private httpClient : HttpClient = inject(HttpClient);
  private apiUrl : String = baseBbdApiUrl + "/bbdrecords";

  public addBbdRecord(addBbdRecordRequestDto : AddBbdRecordRequestDto) : Observable<ResponseBody>{
    return this.httpClient.post<ResponseBody>(`${this.apiUrl}`, addBbdRecordRequestDto);
  }

  public saleProduct(saleProductRequestDto : SaleProductRequestDto) : Observable<ResponseBody>{
    // console.log(saleProductRequestDto);
    return this.httpClient.post<ResponseBody>(`${this.apiUrl}/sale-product`, saleProductRequestDto);
  }
  
}
