import { Component } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-voucher-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatFormFieldModule],
  templateUrl: './voucher-dialog.component.html',
  styles: ``
})
export class VoucherDialogComponent {

}
