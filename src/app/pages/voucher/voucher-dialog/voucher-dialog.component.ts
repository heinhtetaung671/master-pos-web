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
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';
import { MsgBottomSheetComponent } from '../../../widgets/msg-bottom-sheet/msg-bottom-sheet.component';
import { MsgBottomSheetStatus } from '../../../types/types';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-voucher-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatDialogContent, MatFormFieldModule,
      MatDatepickerModule, MatInputModule, MatDialogTitle, ReactiveFormsModule,
      MatSelectModule, MatProgressBarModule, MatAutocompleteModule ],
  templateUrl: './voucher-dialog.component.html',
  styles: ``
})
export class VoucherDialogComponent {

  readonly categoryService = inject(CategoryService);
  readonly service = inject(VoucherService);
  readonly dialogRef = inject(MatDialogRef<VoucherDialogComponent>)
  readonly msgBottomSheet = inject(MatBottomSheet);

  form: FormGroup | undefined = undefined;
  categorySelectOptionList = signal<{id: string, name: string}[] | undefined>(undefined);
  progressBarClass = signal<'hidden' | 'block'>('hidden');
  filteredCategorySelectOptionList = signal<any>([]);
  
  constructor(fb: FormBuilder) {

    this.form = fb.group({
      customerName: ['', Validators.required],
      categoryId: '',
      fees: [0, Validators.required],
      expenses: 0,
      date: '',
      remark: ''
    });

    this.loadCategorySelectOption();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  calculateNetProfit() {
    return this.form?.get('fees')?.value - this.form?.get('expenses')?.value;
  }

  formatDate(orgDate: Date) {
    if(orgDate) {
      let tempMonth = orgDate.getMonth() + 1;

      let year = orgDate.getFullYear();
      let month = tempMonth < 9 ? `0${tempMonth}`: tempMonth;
      let date = orgDate.getDate() < 9 ? `0${orgDate.getDate()}` : orgDate.getDate();
      return `${year}-${month}-${date}`;
    }
    return null;
  }

  create() {
    this.progressBarClass.set('block');
      this.service.create(this.form!.value).subscribe({
        next: result => {
          this.openMsgBottomSheet('success', 'Success', [`${result.customerName} has been created successfully!`])
          this.dialogRef.close();
      },
      error: error => {
        this.openMsgBottomSheet('error', 'Error', error.error.errorMessages);
      }
    });
  }

  loadCategorySelectOption() {
    this.categoryService.loadDataForSelect().subscribe( {
      next: result => {
        this.categorySelectOptionList!.set(result);
        this.filteredCategorySelectOptionList.set(result);
      }
    });
  }

  changeFormDateFormat(event: any) {
    console.log(event.value);
    this.form?.patchValue({ date: this.formatDate(event.value)});
    console.log(this.form?.value);
  }

  refreshCategorySelectOptionList(inputValue: any) {
    this.filteredCategorySelectOptionList.set(this.categorySelectOptionList()!.filter( option => option.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())));
  }

  openMsgBottomSheet(status: MsgBottomSheetStatus, title: string, msg: string[]) {
    this.msgBottomSheet.open(MsgBottomSheetComponent, { data: { status: status, title: title, msg: msg}  });
  }

}
