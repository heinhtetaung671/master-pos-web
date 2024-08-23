import { Component, inject, signal } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VoucherService } from '../../../services/voucher.service';
import { CategoryService } from '../../../services/category.service';
import { MatSelectModule} from '@angular/material/select';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { WidgetsModule } from '../../../widgets/widgets.module';
import { MsgBottomSheetComponent } from '../../../widgets/msg-bottom-sheet/msg-bottom-sheet.component';

@Component({
  selector: 'app-voucher-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatDialogContent, MatFormFieldModule,
      MatDatepickerModule, MatInputModule, MatDialogTitle, ReactiveFormsModule,
      MatSelectModule ],
  templateUrl: './voucher-dialog.component.html',
  styles: ``
})
export class VoucherDialogComponent {

  readonly service = inject(VoucherService);
  readonly categoryService = inject(CategoryService);
  readonly dialogRef = inject(MatDialogRef<VoucherDialogComponent>)
  readonly msgBottomSheet = inject(MatBottomSheet);

  form: FormGroup | undefined = undefined;
  date: any | undefined;
  categorySelectDataList = signal<any>([]);

  constructor(fb: FormBuilder) {

    this.form = fb.group({
      customerName: ['', Validators.required],
      categoryId: '',
      fees: [0, Validators.required],
      expenses: 0,
      date: Date,
      remark: ''
    });

    this.loadCategorySelectData();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  calculateNetProfit() {
    return this.form?.get('fees')?.value - this.form?.get('expenses')?.value;
  }

  create() {
    console.log(this.form?.value);
    if(this.form?.valid) {
      this.service.create(this.form.value).subscribe({
        next: result => {
        console.log(result);
      }, 
      error: error => {
        this.openMsgBottomSheet(error);
      }
    });
    }
      
  }

  loadCategorySelectData() {
    this.categoryService.loadDataForSelect().subscribe( {
      next: result => {
        this.categorySelectDataList.set(result)
      }
    });
  }

  openMsgBottomSheet(msg: string) {
    this.msgBottomSheet.open(MsgBottomSheetComponent, { data: msg });
  }

}
