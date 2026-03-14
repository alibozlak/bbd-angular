import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BbdRecordService } from '../../../services/bbd-record/bbd-record-service';

@Component({
  selector: 'app-add-or-update-bbd-record-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-or-update-bbd-record-component.html',
  styleUrl: './add-or-update-bbd-record-component.css',
})
export class AddOrUpdateBbdRecordComponent {

  private formBuilder = inject(FormBuilder);
  private bbdService = inject(BbdRecordService);

  public bbdForm = this.formBuilder.group({
    productId : [null, Validators.required],
    bestBeforeDate : [null, Validators.required],
    quantity : [null, Validators.required]
  })

}
