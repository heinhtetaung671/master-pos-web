import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoryService } from '../../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingPageComponent } from '../../../widgets/loading-page/loading-page.component';
import { WidgetsModule } from '../../../widgets/widgets.module';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [WidgetsModule],
  templateUrl: './category.component.html',
  styles: ``
})
export class CategoryComponent {

  readonly categoryDialog = inject(MatDialog);

  form: FormGroup;
  service = inject(CategoryService);
  list = signal<any[]>([]);
  loading = signal<boolean>(true);

  openCategoryDialog() {
    let categoryDialogRef = this.categoryDialog.open(CategoryDialogComponent);
  }

  constructor(fb: FormBuilder) {

    this.form = fb.group({
      keyword: ''
    });

    this.search();
  }

  search() {
    this.showLoadingPage();
    this.service.search(this.form.value).subscribe({
      next: result => {
        this.list.set(result);
        this.hideLoadingPage();
      }
    })
  }

  showLoadingPage() {
    this.loading.set(true);
  }

  hideLoadingPage() {
    this.loading.set(false)
  }
}
