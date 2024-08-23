import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarTabComponent } from './side-bar-tab/side-bar-tab.component';
import { RouterModule } from '@angular/router';
import { MsgBottomSheetComponent } from './msg-bottom-sheet/msg-bottom-sheet.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';


@NgModule({
  declarations: [
    SideBarTabComponent,
    MsgBottomSheetComponent,
    LoadingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SideBarTabComponent,
    MsgBottomSheetComponent,
    LoadingPageComponent
  ]
})
export class WidgetsModule { }
