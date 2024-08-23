import { Component, inject, signal } from '@angular/core';
import { VoucherDialogComponent } from '../voucher-dialog/voucher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VoucherService } from '../../../services/voucher.service';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../../widgets/widgets.module';


@Component({
  selector: 'app-voucher-daily',
  standalone: true,
  imports: [RouterModule, WidgetsModule],
  templateUrl: './voucher-daily.component.html',
})
export class VoucherDailyComponent {

  readonly voucherDialog = inject(MatDialog);
  readonly service = inject(VoucherService);
  
  loading = signal<boolean>(true);
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
    this.showLoadingPage();
    this.service.search({}).subscribe(result => {
      this.voucherList.set(result);
      this.hideLoadingPage();
    })
  }

  refresh() { 
    this.showLoadingPage();
    this.service.search({}).subscribe({
      next: result => {
        this.voucherList.set(result);
        this.hideLoadingPage()
      }
    })
  }

  showLoadingPage() {
    this.loading.set(true);
  }

  hideLoadingPage() {
    this.loading.set(false);
  }
  
}
