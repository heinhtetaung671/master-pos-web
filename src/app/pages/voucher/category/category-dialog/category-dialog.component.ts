import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './category-dialog.component.html',
  styles: ``
})
export class CategoryDialogComponent {

  readonly dialogRef = inject(MatDialogRef<CategoryDialogComponent>);
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
  
}
