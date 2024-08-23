import { Component, inject, signal } from '@angular/core';
import { VoucherDialogComponent } from '../voucher-dialog/voucher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VoucherService } from '../../../services/voucher.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-voucher-daily',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './voucher-daily.component.html',
})
export class VoucherDailyComponent {

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
