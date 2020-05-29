import { NgModule } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ShareModule } from '../share/share.module';
import { IonicModule } from '@ionic/angular';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    ShareModule,
    IonicModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    LottieModule.forRoot({ player: playerFactory }),
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
