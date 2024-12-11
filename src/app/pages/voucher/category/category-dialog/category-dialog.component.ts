import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CategoryService } from '../../../../services/category.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MsgBottomSheetStatus } from '../../../../types/types';
import { MsgBottomSheetComponent } from '../../../../widgets/msg-bottom-sheet/msg-bottom-sheet.component';


@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './category-dialog.component.html',
  styles: ``
})
export class CategoryDialogComponent {

  readonly dialogRef = inject(MatDialogRef<CategoryDialogComponent>);
  readonly service = inject(CategoryService);
  readonly msgBottomSheet = inject(MatBottomSheet);

  form :FormGroup;

  constructor( fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      description: ''
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    if(this.form.valid) {
      this.service.create(this.form.value).subscribe({
        next: result => {
          this.dialogRef.close();
          this.openMsgBottomSheet('success', 'Success', [`${result.name} has been created successfully.`])
        }, error: error => {
          this.openMsgBottomSheet('error', 'Error', error.error.errorMessages);
        }
      });
    }
  }
 
  openMsgBottomSheet(status: MsgBottomSheetStatus, title: string, msg: string[]) {
    this.msgBottomSheet.open(MsgBottomSheetComponent, { data: {status: status, title: title, msg: msg}})
  }
  
}
