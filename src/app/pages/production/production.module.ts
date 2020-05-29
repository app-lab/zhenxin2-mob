import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';

import { ProductionPageRoutingModule } from './production-routing.module';

import { ProductionPage } from './production.page';
import { ShareModule } from 'src/app/share/share.module';
import { IonicModule } from '@ionic/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    ShareModule,
    IonicModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    ProductionPageRoutingModule
  ],
  declarations: [ProductionPage]
})
export class ProductionPageModule {}
