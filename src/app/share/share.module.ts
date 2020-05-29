import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { InoutService } from '../service/inout.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers:[ApiService,InoutService],
  exports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, FormsModule, HttpClientModule,]
})
export class ShareModule { }
