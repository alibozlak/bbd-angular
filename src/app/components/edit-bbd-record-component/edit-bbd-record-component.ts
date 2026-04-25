import { Component, inject, OnInit } from '@angular/core';
import { UpdateBbdRecordPageModel } from '../../models/update-bbd-record/update-bbd-record-page-model.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { user } from '../../utils/project-constant';
import { SaleProductRequestDto } from '../../models/bbd-record/sale-product-request.model';
import { BbdRecordService } from '../../services/bbd-record/bbd-record-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-bbd-record-component',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatSelectModule, MatFormField, MatLabel, MatOption,
    MatSnackBarModule
  ],
  templateUrl: './edit-bbd-record-component.html',
  styleUrl: './edit-bbd-record-component.css',
})
export class EditBbdRecordComponent implements OnInit {

  public model: UpdateBbdRecordPageModel | undefined;
  public quantityList: number[] = [];
  public selectedGiveQuantity: number = 1;
  public selectedSaleQuantity: number = 1;
  private bbdRecordService: BbdRecordService = inject(BbdRecordService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    const state = history.state as UpdateBbdRecordPageModel;

    if (state.bbdRecordId) {
      this.model = state;
      for (let i = 0; i < state.quantity; i++) {
        this.quantityList[i] = i + 1;
      }
    }
  }

  onAction(quantity: number, activityType: string) {
    let activityTypeId: number;

    if (activityType == "GIVE") {
      activityTypeId = parseInt(localStorage.getItem("REMOVAL_TYPE_GIVE")!);
    } else if (activityType == "SALE") {
      activityTypeId = parseInt(localStorage.getItem("REMOVAL_TYPE_SALE")!);
    } else {
      activityTypeId = parseInt(localStorage.getItem("UPDATE")!);
    }

    const saleProductRequestDto: SaleProductRequestDto = {
      activityTypeId: activityTypeId,
      bbdRecordId: this.model?.bbdRecordId!,
      newQuantity: (this.quantityList.length - quantity),
      saledQuantity : quantity,
      userId: user.getUserId()
    };

    this.bbdRecordService.saleProduct(saleProductRequestDto).subscribe({
      next: (response) => {
        this.quantityList.splice(saleProductRequestDto.newQuantity);
        if (saleProductRequestDto.newQuantity > 0) {
          this.snackBar.open(`${saleProductRequestDto.newQuantity} Adet Kaldı..`, "Kapat", { duration: 2000 });
        } else {
          this.snackBar.open(`Üründen hiç kalmadı. Sıradakine devam..`, "Kapat", { duration: 2000 });
        }
      },

      error: (error) => {
        this.snackBar.open(`İşlem yapılamadı.. :(`, "Kapat", { duration: 2000 });
        console.log(error);
      }
    });
  }

}