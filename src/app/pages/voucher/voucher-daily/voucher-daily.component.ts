import { Component, computed, inject, signal } from '@angular/core';
import { VoucherDialogComponent } from '../voucher-dialog/voucher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VoucherService } from '../../../services/voucher.service';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../../widgets/widgets.module';
import { isNotAListOrEmptyList } from '../../../utils/utility';


@Component({
  selector: 'app-voucher-daily',
  standalone: true,
  imports: [RouterModule, WidgetsModule],
  templateUrl: './voucher-daily.component.html',
})
export class VoucherDailyComponent {

  readonly voucherDialog = inject(MatDialog);
  readonly service = inject(VoucherService);
  
  loading = computed( () => isNotAListOrEmptyList(this.voucherList()) );
  voucherList = signal<any[] | undefined>(undefined);

  constructor() {
    this.refresh();
  }

  openVoucherDialog() {
   const voucherDialogRef = this.voucherDialog.open(VoucherDialogComponent);
   voucherDialogRef.afterClosed().subscribe( _ => {
    this.refresh();
   })
  }

  search() {
    this.service.search({}).subscribe(result => {
      this.voucherList.set(result);
    })
  }

  refresh() { 
    this.service.search({}).subscribe({
      next: result => {
        this.voucherList.set(result);
      }
    })
  }

}
