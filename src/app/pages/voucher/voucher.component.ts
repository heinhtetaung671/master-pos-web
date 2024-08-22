import { Component, inject } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { VoucherDialogComponent } from './voucher-dialog/voucher-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [CategoryComponent, VoucherDialogComponent],
  templateUrl: './voucher.component.html',
  styles: ``
})
export class VoucherComponent {

  readonly voucherDialog = inject(MatDialog);

  openVoucherDialog() {
    this.voucherDialog.open(VoucherDialogComponent);
  }
  
}
