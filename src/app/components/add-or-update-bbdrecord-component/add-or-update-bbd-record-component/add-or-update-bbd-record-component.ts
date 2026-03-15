import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BbdRecordService } from '../../../services/bbd-record/bbd-record-service';
import { ProductService } from '../../../services/product/product-service';
import { ProductIdNameCodeAndPriceResponseDto } from '../../../models/product/product-id-name-code-price.model';
import { AddBbdRecordRequestDto } from '../../../models/bbd-record/add-bbd-record-request.model';

@Component({
  selector: 'app-add-or-update-bbd-record-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-or-update-bbd-record-component.html',
  styleUrl: './add-or-update-bbd-record-component.css',
})
export class AddOrUpdateBbdRecordComponent {

  private formBuilder = inject(FormBuilder);
  private bbdService = inject(BbdRecordService);
  private productService = inject(ProductService);

  public products : ProductIdNameCodeAndPriceResponseDto[] | undefined;

  public constructor() {
    this.productService.getAllProductIdNameCodeAndPriceDtos().subscribe(response => {
      this.products = response.object;
    });
  }

  public bbdForm = this.formBuilder.group({
    productId : [null, Validators.required],
    bestBeforeDate : [null, Validators.required],
    quantity : [null, [Validators.required, Validators.min(1)]]
  });

  public onSubmit() {
    const addBbdRecordRequestDto : AddBbdRecordRequestDto = {
      userId : localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")!) : 0,
      productId : parseInt(this.bbdForm.getRawValue().productId!),
      bestBeforeDate : this.bbdForm.getRawValue().bestBeforeDate!,
      quantity : parseInt(this.bbdForm.getRawValue().quantity!),

      activityTypeId : parseInt(localStorage.getItem("CREATE")!)
    };    

    this.bbdService.addBbdRecord(addBbdRecordRequestDto).subscribe({
      next: (response) => {
        this.bbdForm.reset();
      },
      error: (error) => {
        alert("Kayıt eklenemedi!\n\n" + error.error.message);
      }
    });
  }

}
