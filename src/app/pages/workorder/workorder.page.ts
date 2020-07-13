import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Store } from '@ngrx/store';
import { State, getName, getAllStop } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { PopoverController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { MypppoverComponent } from './mypppover/mypppover.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router} from '@angular/router';
import { NewPlan } from 'src/app/models/NewPlan.model';
import { Station } from 'src/app/models/Station.model';
import { Procedure } from 'src/app/models/Procedure.model';
import { AddProcesses } from 'src/app/redactions/commondata.actions';
import { StopEquipment } from 'src/app/models/stopequipment.model';
import { StopequipComponent } from 'src/app/comps/stopequip/stopequip.component';
import { MywebsocketService } from 'src/app/service/mywebsocket.service';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  mystopEquipment: StopEquipment[],
  stationName: string
}

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.page.html',
  styleUrls: ['./workorder.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorkorderPage implements OnInit, OnDestroy {
  total: number = 0
  page: number = 1
  limit: number = 9999
  searchVal: string = ''
  status: number = 2

  name$: Observable<string>; // 用户姓名
  
  workorderListData: NewPlan[] = []
  dataSource;
  columnsToDisplay = ['batchNumber', 'orderName', 'processFlowName', 'quantity', 'priority', 'operation'];
  nameCh = {'batchNumber':'生产批次号', 'orderName': '订单名称', 'processFlowName': '工艺', 'quantity': '生产数量', 'priority': '优先级', 'operation': '操作' };
  expandedElement: NewPlan | null;

  provinceData: Station[]  = []; // 工位信息
  cityData: { [place: number]: Procedure[] } = {}; // 工序参数对
  stationidlist: number[] = [] // 该员工所拥有的工位id列表
  selectedProvince: number;
  selectedCity:number = null;
  selectedPriority: string = null
  stopids: number[];  // 关闭设备id
  stopEquipment: StopEquipment[];                 // 关闭设备id对应的工位

  constructor(public apiServer: ApiService,private store: Store<State>, public popoverController: PopoverController, public router: Router,public dialog: MatDialog,
              public mywebsocket: MywebsocketService, public modalController: ModalController, public toastController: ToastController) {
               
               }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.mywebsocket.allequipment()
    this.mywebsocket.updateequipment()
    this.name$ = this.store.select(getName);
    var stationstr: string = localStorage.getItem('stationlist')
    this.store.select(getAllStop).subscribe(res => {
      if (res.length) {
        this.stopids = [...res]
        this.everytime(this.stopids)
      }
    })
    if (stationstr) {
      this.stationidlist = stationstr.split('^').map(Number)
      this.selectedProvince = this.stationidlist[0]
      this.pullstationlist(stationstr);
      this.pullprocesslist(stationstr);
      this.getList()
    }
    
    
  }

  ionViewWillLeave() {
   
  }

  ngOnDestroy(): void {
    // this.mywebsocket.close()
  }

  

  // 筛选优先级
  priorityChange(data) {
    let showworkorderListData: NewPlan[]= this.workorderListData.filter((item) => {
        return item.priority === data.value
    })
    this.dataSource = new MatTableDataSource(showworkorderListData)
  }

  // 根据关闭设备--获取相工位
  everytime(data: number[]) {
    this.apiServer.getTokenTwo('basicdata/private/station/getStationsByEquipmentIds/', data.join('^')).subscribe((res) => {
      if (res.result.length) {
        this.stopEquipment = res.result;
        this.giveTip()
      }
    })
  }

  async giveTip() {
    let mystopEquipment: StopEquipment[] = []
    let stationName:string = ''
    this.stopEquipment.forEach(element => {
      element.stationList.forEach(item => {
        if (item.id === this.selectedProvince) {
          stationName = item.stationName
          mystopEquipment.push(element)
        }
      })
    });
    if (mystopEquipment.length) {
      const modal = await this.modalController.create({
        component: StopequipComponent,
        backdropDismiss: false,
        cssClass: 'mycustom',
        componentProps: {
          mystopEquipment: mystopEquipment,
          stationName: stationName
        }
      });
      return await modal.present();
     


    }
  }

  getList() {
    this.apiServer.getToken('production/private/workorder', {page: this.page, limit: this.limit, status: this.status, searchVal: this.searchVal, stationId:this.selectedProvince,procedureId: this.selectedCity}).subscribe((res) => {
      this.workorderListData = JSON.parse(JSON.stringify(res.result.content)) 
      this.dataSource = new MatTableDataSource(this.workorderListData)
    })
  }
  
  // 工位改变事件---接连选择
  provinceChange(data): void {
    this.selectedCity = null
    var stationone: Station = this.provinceData.find(item => item.id === data.value)
    localStorage.setItem('station', JSON.stringify(stationone))
    this.everytime(this.stopids)
    this.getList()
  }

  // 工序改变事件
  cityChange(data) {
    var procedureone: Procedure = this.cityData[this.selectedProvince].find(item => item.id === data.value)
    localStorage.setItem('procedure', JSON.stringify(procedureone))
    this.getList()
  }

  // 获取工位列表
  pullstationlist(data) {
    this.apiServer.getTokenTwo('basicdata/private/station/getStationsByIds/', data).subscribe(res => {
        if (!res.result) {
            return;
        }
        this.provinceData = res.result;
        var stationone: Station = this.provinceData.find(item => item.id === this.selectedProvince)
        localStorage.setItem('station', JSON.stringify(stationone))
    })
  }

  // 获取工序列表
  pullprocesslist(data:string) {
    this.apiServer.getTokenTwo('basicdata/private/procedure/getProcedureListByStationIds/', data).subscribe(res => {
      if (!res.result) {
        return;
      }
      this.buildCity(data, res.result);
      // this.selectedCity = this.cityData[this.selectedProvince][0].id
      this.store.dispatch(new AddProcesses({hasProcess: this.cityData}))
    })
  }

  async buildCity(data: string, mylist: Procedure[]) {
    this.cityData = {}
    await data.split('^').forEach(element => {
      this.cityData[+element] = []
      mylist.forEach(item => {
        if (item.stationId.indexOf(element) != -1) {
          this.cityData[+element] = [...this.cityData[+element], item]
        }
      })
    });
  }

  goproduce(data) {
    if (this.selectedCity) {
      localStorage.setItem('workorderData', JSON.stringify(data))
      this.router.navigate(['/production'])
    } else {
      this.presentToast('请选择工序')
    }
  }

  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'warning',
    });
    toast.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MypppoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
