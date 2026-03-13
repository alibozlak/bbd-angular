import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product-service';
import { CommonModule } from '@angular/common';
import { AddOrUpdateProductRequestDto } from '../../../models/product/add-or-update-product-request.model';

@Component({
  selector: 'app-add-or-update-product-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-or-update-product-component.html',
  styleUrl: './add-or-update-product-component.css',
})
export class AddOrUpdateProductComponent {

  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService)

  public removalDates : number[] = [2, 3, 7, 1];
  public taxes : number[] = [1, 10, 20];

  addOrUpdateProductForm = this.formBuilder.group({
    productId : [0, Validators.min(0)],
    productName : ['', Validators.required],
    productCode : ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    bestBefore : [null, Validators.required],
    price : [null, [Validators.required, Validators.min(0)]],
    tax : [null, Validators.required]
  });

  public onSubmit() {
    if (this.addOrUpdateProductForm.valid) {
      const addOrUpdateRequestDto : AddOrUpdateProductRequestDto = {
        productName : this.addOrUpdateProductForm.getRawValue().productName!,
        productCode : this.addOrUpdateProductForm.getRawValue().productCode!,
        bestBefore : this.addOrUpdateProductForm.getRawValue().bestBefore!,
        price : this.addOrUpdateProductForm.getRawValue().price!,
        tax : this.addOrUpdateProductForm.getRawValue().tax!
      }

      this.productService.addProduct(addOrUpdateRequestDto).subscribe({
        next: (response) => {
          alert("Ürün eklendi!");
          this.addOrUpdateProductForm.reset();
        },
        error: (error) => {
          alert("Ürün eklenemedi!\n\n" + error.error.message);
        }
      });

    }
  }

}
