import { Component } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [WidgetsModule],
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent {

}
