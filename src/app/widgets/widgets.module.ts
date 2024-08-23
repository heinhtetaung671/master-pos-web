import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarTabComponent } from './side-bar-tab/side-bar-tab.component';
import { RouterModule } from '@angular/router';
import { MsgBottomSheetComponent } from './msg-bottom-sheet/msg-bottom-sheet.component';


@NgModule({
  declarations: [
    SideBarTabComponent,
    MsgBottomSheetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SideBarTabComponent,
    MsgBottomSheetComponent
  ]
})
export class WidgetsModule { }
