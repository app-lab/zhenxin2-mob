import { Component, OnInit, Input, Inject } from '@angular/core';
import { StopEquipment } from 'src/app/models/stopequipment.model';
import { ModalController } from '@ionic/angular';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogData } from 'src/app/pages/workorder/workorder.page';


@Component({
  selector: 'app-stopequip',
  templateUrl: './stopequip.component.html',
  styleUrls: ['./stopequip.component.scss'],
})
export class StopequipComponent implements OnInit {
  @Input() mystopEquipment: StopEquipment[];
  @Input() stationName: string;
  displayedColumns: string[] = ['equipmentCode', 'equipmentName', 'stationName'];
  dataSource
  constructor(private modalCtrl: ModalController) {
    
  }

  ngOnInit() {
    console.log(5555)
   this.dataSource = this.mystopEquipment
  }

  async close() {
    await this.modalCtrl.dismiss()
  }

}
