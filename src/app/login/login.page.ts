import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { AnimationItem } from 'lottie-web';
import { Router } from '@angular/router';
import {Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { AddName } from '../redactions/commondata.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  hide = true;
  options = {
    path: '../assets/animations/robotic-arm-animation.json',
  };
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  private animationItem: AnimationItem;
  constructor(private ngZone: NgZone, private router: Router, public toastController: ToastController, public apiServer: ApiService, private store: Store<State>) {

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.destroy());
  }

  login() {
    if (this.userName.value && this.password.value) {
      this.apiServer.post('authority/public/login', { userName: this.userName.value, password: this.password.value }).subscribe(res => {
        if(!res.errorCode) {
          var authority: number[] = res.result.authority.split(',').map(Number)
          if (authority.includes(4000) || authority.includes(4001)) {
            this.store.dispatch(new AddName({ name: res.result.name }))
            localStorage.setItem('token', res.result.token)
            localStorage.setItem('userInfo',JSON.stringify({ userAccount: this.userName.value, userName: res.name }))
            localStorage.setItem('stationlist',res.result.stationId)
            this.store.dispatch(new AddName({name: res.result.name}))
            this.router.navigateByUrl('workorder')
          } else {
            this.presentToast("你没有访问'生产执行'的权限")
          }
        } else {
          this.presentToast(res.errorMsg)
        }
        

      })

    } else {
      this.presentToast('请输入用户名和密码')
    }

  }

  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
 
  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.destroy());
  }
 
  play(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }

}
