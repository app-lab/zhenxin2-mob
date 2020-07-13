import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { AddAllStop } from '../redactions/commondata.actions';

@Injectable({
  providedIn: 'root'
})
export class MywebsocketService {
  socket;
  stopids: number[];  // 关闭设备id
  constructor(private store: Store<State>) {
    this.socket = io('http://47.114.39.156:3300');
  }

  allequipment() {
    this.socket.on('allequipment', (res) => {
      this.stopids = res.map(item => item.id).map(Number)
      this.store.dispatch(new AddAllStop({ allstop: [...this.stopids] }))
    })
  }

  updateequipment() {
    this.socket.on('updateequipment', (res) => {
      if (!res.status) {
        this.stopids = [...this.stopids, res.id]
      } else {
        let myindex = this.stopids.indexOf(res.id)
        if (myindex > -1) {
          this.stopids.splice(myindex, 1)
        }
      }
      this.store.dispatch(new AddAllStop({ allstop: [...this.stopids] }))
    })
  }

  close() {
    this.socket.close()
  }

}
