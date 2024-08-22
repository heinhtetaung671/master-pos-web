import { Component, inject, signal } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-voucher-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatDialogContent, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatDialogTitle, ReactiveFormsModule],
  templateUrl: './voucher-dialog.component.html',
  styles: ``
})
export class VoucherDialogComponent {

  form: FormGroup | undefined = undefined;
  date: any | undefined;


  readonly dialogRef = inject(MatDialogRef<VoucherDialogComponent>)

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      customerName: ['', Validators.required],
      fees: [0, Validators.required],
      sparepartsExpense: 0,
      date: Date,
      remark: ''
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  calculateNetProfit() {
    return this.form?.get('fees')?.value - this.form?.get('sparepartsExpense')?.value;
  }

}
