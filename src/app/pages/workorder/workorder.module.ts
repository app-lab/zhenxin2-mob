import { NgModule } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';

import { WorkorderPageRoutingModule } from './workorder-routing.module';

import { WorkorderPage } from './workorder.page';
import { ShareModule } from 'src/app/share/share.module';

import { MypppoverComponent } from './mypppover/mypppover.component';
import { IonicModule } from '@ionic/angular';
import { CompsModule } from 'src/app/comps/comps.module';

@NgModule({
  imports: [
    ShareModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatDialogModule,
    IonicModule,
    CompsModule,
    WorkorderPageRoutingModule
  ],
  declarations: [WorkorderPage, MypppoverComponent]
})
export class WorkorderPageModule {}
