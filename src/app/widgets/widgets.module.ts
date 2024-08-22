import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarTabComponent } from './side-bar-tab/side-bar-tab.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SideBarTabComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideBarTabComponent
  ]
})
export class WidgetsModule { }
