import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoryService } from '../../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingPageComponent } from '../../../widgets/loading-page/loading-page.component';
import { WidgetsModule } from '../../../widgets/widgets.module';
import { isNotAListOrEmptyList } from '../../../utils/utility';

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
  list = signal<any[] | undefined>(undefined);
  loading = computed( () => isNotAListOrEmptyList(this.list()) ); 

  openCategoryDialog() {
    let categoryDialogRef = this.categoryDialog.open(CategoryDialogComponent);
    categoryDialogRef.afterClosed().subscribe( _ => {
      this.refresh();
    })
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      keyword: ''
    });

    this.refresh();
  }

  search() {
    this.service.search(this.form.value).subscribe({
      next: result => {
        this.list.set(result);
      }
    })
  }

  refresh() {
    this.service.search({}).subscribe({
      next: result => {
        this.list.set(result);

      }
    })
  }
}
