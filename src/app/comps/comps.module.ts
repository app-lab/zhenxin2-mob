import { NgModule } from '@angular/core';

import { ShareModule } from '../share/share.module';
import { IonicModule } from '@ionic/angular';
import { StopequipComponent } from './stopequip/stopequip.component';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [StopequipComponent],
  imports: [
    ShareModule,
    MatTableModule,
    IonicModule,
  ],
  exports: [StopequipComponent, MatTableModule],
  entryComponents: [StopequipComponent]
})
export class CompsModule { }
