import { Component, inject, signal } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { VoucherDialogComponent } from './voucher-dialog/voucher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VoucherService } from '../../services/voucher.service';
import { VoucherDailyComponent } from './voucher-daily/voucher-daily.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [CategoryComponent, VoucherDialogComponent, VoucherDailyComponent, RouterModule],
  templateUrl: './voucher.component.html',
})
export class VoucherComponent {

  readonly voucherDialog = inject(MatDialog);
  readonly service = inject(VoucherService);
  
  voucherList = signal<any>([]);

  constructor() {
    this.refresh();
  }

  openVoucherDialog() {
   const voucherDialogRef = this.voucherDialog.open(VoucherDialogComponent);
   voucherDialogRef.afterClosed().subscribe(value => {
    this.refresh();
   })
  }

  search() {
    this.service.search({}).subscribe(result => {
      this.voucherList.set(result);
    })
  }

  refresh() {
    this.service.search({}).subscribe(result => {
      this.voucherList.set(result);
    })
  }
  
}
