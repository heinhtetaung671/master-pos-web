import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styles: ``
})
export class CategoryComponent {

  readonly categoryDialog = inject(MatDialog);
  service = inject(CategoryService);

  openCategoryDialog() {
    let categoryDialogRef = this.categoryDialog.open(CategoryDialogComponent);
  }

  constructor() {
    console.log(this.service.search({}).subscribe(result => {
      console.log(result)
    }))
  }


}
