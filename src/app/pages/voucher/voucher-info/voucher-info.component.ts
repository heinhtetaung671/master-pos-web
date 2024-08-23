import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VoucherService } from '../../../services/voucher.service';

@Component({
  selector: 'app-voucher-info',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './voucher-info.component.html',
  styles: ``
})
export class VoucherInfoComponent implements OnInit {

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly service = inject(VoucherService);

  date = signal<any>('');
  list = signal<any>([]);

  ngOnInit(): void {
    this.date.set(this.route.snapshot.paramMap.get('date'))
    this.service.findByDate(this.date()).subscribe(result => {
      this.list.set(result);
    })
  }

}
