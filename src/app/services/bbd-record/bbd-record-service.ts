import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { AddBbdRecordRequestDto } from '../../models/bbd-record/add-bbd-record-request.model';
import { Observable } from 'rxjs';
import { ResponseBody } from '../../models/response-body/response-body.model';
import { SaleProductRequestDto } from '../../models/bbd-record/sale-product-request.model';
import { ResponseBodyWithObject } from '../../models/response-body/response-body-with-object.model';
import { UpdateBbdRecordPageResponseDto } from '../../models/update-bbd-record-page/update-bbd-record-page-response.model';
import { UpdateBbdRecordRequestDto } from '../../models/bbd-record/update-bbd-record-request.model';
import { UpdateBbdRecordPageModel } from '../../models/update-bbd-record/update-bbd-record-page-model.model';
import { DeleteBbdRecordRequestDto } from '../../models/bbd-record/delete-bbd-record-request.model';

@Injectable({
  providedIn: 'root',
})
export class BbdRecordService {

  private httpClient : HttpClient = inject(HttpClient);
  private apiUrl : String = baseBbdApiUrl + "/bbdrecords";

  public addBbdRecord(addBbdRecordRequestDto : AddBbdRecordRequestDto) : Observable<ResponseBody>{
    return this.httpClient.post<ResponseBody>(`${this.apiUrl}`, addBbdRecordRequestDto);
  }

  public getUpdateBbdRecordPageModel(bbdRecordId : number) : Observable<ResponseBodyWithObject<UpdateBbdRecordPageModel>>{
    return this.httpClient.post<ResponseBodyWithObject<UpdateBbdRecordPageModel>>(
      `${this.apiUrl}/get-update-bbd-record-page-model`, bbdRecordId
    );
  }//

  public saleProduct(saleProductRequestDto : SaleProductRequestDto) : Observable<ResponseBody>{
    return this.httpClient.post<ResponseBody>(`${this.apiUrl}/sale-product`, saleProductRequestDto);
  }

  public getUpdateBbdRecordPageDto(bbdRecordId : number) : Observable<ResponseBodyWithObject<UpdateBbdRecordPageResponseDto>> {

    return this.httpClient.post<ResponseBodyWithObject<UpdateBbdRecordPageResponseDto>>(
      `${this.apiUrl}/get-update-bbd-record-page-dto`, bbdRecordId
    );
  }

  public updateBbdRecord(updateBbdRecordRequestDto : UpdateBbdRecordRequestDto) : Observable<ResponseBodyWithObject<number>> {
    return this.httpClient.put<ResponseBodyWithObject<number>>(`${this.apiUrl}`, updateBbdRecordRequestDto);
  }

  public deleteBbdRecord(deleteBbdRecordRequestDto : DeleteBbdRecordRequestDto) : Observable<ResponseBody> {
    return this.httpClient.delete<ResponseBody>(`${this.apiUrl}`, {body : deleteBbdRecordRequestDto});
  }
  
}
