import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Store} from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Clean } from 'src/app/redactions/commondata.actions';

@Component({
  selector: 'app-mypppover',
  templateUrl: './mypppover.component.html',
  styleUrls: ['./mypppover.component.scss'],
})
export class MypppoverComponent implements OnInit {

  constructor(public router: Router, public popoverController: PopoverController, private store: Store<State>) { }

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.popoverController.dismiss();
    this.store.dispatch(new Clean());
    this.router.navigate(['/login']);
   
  }

}
