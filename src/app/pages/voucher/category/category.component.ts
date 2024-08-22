import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styles: ``
})
export class CategoryComponent {

  readonly categoryDialog = inject(MatDialog);

  openCategoryDialog() {
    let categoryDialogRef = this.categoryDialog.open(CategoryDialogComponent);
  }


}
