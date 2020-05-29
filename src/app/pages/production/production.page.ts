import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NewPlan } from 'src/app/models/NewPlan.model';
import { ProductionProcessProductDetail } from 'src/app/models/ProductionProcessProductDetail.model';
import { Procedure } from 'src/app/models/Procedure.model';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Station } from 'src/app/models/Station.model';
import { Store} from '@ngrx/store';
import { State, getProcesses } from 'src/app/reducers';
import { EquipmentNumber } from 'src/app/models/equipmentnumber.model';
import { ApiService } from 'src/app/service/api.service';
import { InoutService } from 'src/app/service/inout.service';




@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage implements OnInit {
  workorderData: NewPlan;
  station: Station = null
  procedure: Procedure = null
  innum = 0
  outnum = 0
  mynum = 0
  cityData: { [place: number]: Procedure[] } = {};  // 工序参数对
  cityData$;
  selectedCity: number = null; // 当前工序
  unCheckInPppListData: ProductionProcessProductDetail[] = []
  doCheckInPppListData: ProductionProcessProductDetail[] = []

  displayedColumns: string[] = ['select','productCode', 'woId', 'productName'];
  tipDisplayedColumns: string[] = ['equipmentCode','equipmentName', 'programList'];
  dataSource: MatTableDataSource<ProductionProcessProductDetail> = new MatTableDataSource<ProductionProcessProductDetail>([]);
  tipDataSource: MatTableDataSource<EquipmentNumber> = new MatTableDataSource<EquipmentNumber>([]);
  selection = new SelectionModel<ProductionProcessProductDetail>(true, []);

  constructor(public apiServer: ApiService, public inoutService: InoutService, private store: Store<State>,) {
    this.procedure = JSON.parse(localStorage.getItem('procedure'))
    this.selectedCity = this.procedure.id
    this.station = JSON.parse(localStorage.getItem('station'))
    this.workorderData = JSON.parse(localStorage.getItem('workorderData'))
   }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.unCheckInPppGetList()
    this.doCheckInPppGetList()
    this.store.select(getProcesses).subscribe(res => {
      console.log(res)
      this.cityData = res 
    });
    this.whichnum()
  }

  whichnum() {
    this.apiServer.getToken('basicdata/private/program/getEquipmentAndProgramList',{procedureId: this.procedure.id, stationId: this.station.id, woId: this.workorderData.id}).subscribe((res) => {
        console.log(555555)
        console.log(res)
        this.tipDataSource = new MatTableDataSource<EquipmentNumber>(res.result);
    })
  }

  // 工序变更
  cityChange(data) {
    this.procedure = this.cityData[this.station.id].find(item => item.id === data.value)
    this.unCheckInPppGetList()
    this.doCheckInPppGetList()
    this.whichnum()
  }

  unCheckInPppGetList(): void {
    this.apiServer.getToken('production/private/ppp',{ page: 1, limit: 50000, status: 0, procedureId: this.procedure.id, woId: this.workorderData.id}).subscribe(res => {
      console.log(res)
      this.innum = res.result.totalElements
      this.unCheckInPppListData = res.result.content
      this.buildDataSource()
    })
  }

  doCheckInPppGetList(): void {
    this.apiServer.getToken('production/private/ppp',{ page: 1, limit: 50000, status: 1, procedureId: this.procedure.id, woId: this.workorderData.id }).subscribe(res => {
      this.outnum = res.result.totalElements
      this.doCheckInPppListData = res.result.content
      this.buildDataSource()
    })
  }

  buildDataSource() {
    if(this.mynum === 0) {
      this.dataSource = new MatTableDataSource<ProductionProcessProductDetail>(this.unCheckInPppListData);
    } else if(this.mynum === 1) {
      this.dataSource = new MatTableDataSource<ProductionProcessProductDetail>(this.doCheckInPppListData);
    }
  }

  // 进站
  goin() {
    console.log(this.selection.selected)
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.inoutService.post('production/private/productionExcute/checkIn', {userInfo: userInfo, procedureInfo: this.procedure,stationInfo: this.station,productInfo: this.selection.selected, woId: [this.workorderData.id]}).subscribe((res) => {
      this.selection.clear()
      this.unCheckInPppGetList()
      this.doCheckInPppGetList()
    })
  }

  // 出站
  goout() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.inoutService.post('production/private/productionExcute/checkOut', {userInfo: userInfo, procedureInfo: this.procedure,stationInfo: this.station,productInfo: this.selection.selected, woId: [this.workorderData.id]}).subscribe((res) => {
      this.selection.clear()
      this.unCheckInPppGetList()
      this.doCheckInPppGetList()
    })
  }

  goback() {
    history.go(-1)
  }

  changeinout(data) {
    this.selection.clear()
    console.log(data.index)
    this.mynum = data.index
    this.buildDataSource()
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductionProcessProductDetail): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
