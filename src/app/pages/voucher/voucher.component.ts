import { Component, inject, signal } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { VoucherDialogComponent } from './voucher-dialog/voucher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VoucherService } from '../../services/voucher.service';


@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [CategoryComponent, VoucherDialogComponent],
  templateUrl: './voucher.component.html',
  styleUrl: `./voucher.component.scss`
})
export class VoucherComponent {

  readonly voucherDialog = inject(MatDialog);
  readonly service = inject(VoucherService);
  
  voucherList = signal<any>([]);

  constructor() {
    this.search();
  }

  openVoucherDialog() {
    this.voucherDialog.open(VoucherDialogComponent);
  }

  search() {
    this.service.search({}).subscribe(result => {
      this.voucherList.set(result);
    })
  }
  
}
