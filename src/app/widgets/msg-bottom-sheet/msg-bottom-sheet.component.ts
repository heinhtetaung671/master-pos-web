import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-msg-bottom-sheet',
  templateUrl: './msg-bottom-sheet.component.html',
  styles: ``
})
export class MsgBottomSheetComponent {

  bottomSheetRef = inject<MatBottomSheetRef<MsgBottomSheetComponent>>(MatBottomSheetRef);

}
