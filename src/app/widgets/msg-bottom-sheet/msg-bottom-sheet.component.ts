import { Component, inject, OnInit, signal } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { MsgBottomSheetData, MsgBottomSheetStatus } from '../../types/types';

@Component({
  selector: 'app-msg-bottom-sheet',
  templateUrl: './msg-bottom-sheet.component.html',
  styles: ``
})
export class MsgBottomSheetComponent {

  bottomSheetRef = inject<MatBottomSheetRef<MsgBottomSheetComponent>>(MatBottomSheetRef); 
  data = inject<MsgBottomSheetData>(MAT_BOTTOM_SHEET_DATA);

  status = signal<MsgBottomSheetStatus>(this.data.status)
  title = signal(this.data.title);
  messages = signal<any>(this.data.msg);

  constructor() {
    console.log(this.messages());
  }

  ifArray(data: any) {
    return Array.isArray(data);
  }
}
