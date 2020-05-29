import { Procedure } from '../models/Procedure.model';


export interface CommonData {
    name: string; // 用户名
    hasProcess: { [place: number]: Procedure[]}; // 各个工位对应的工序列表
    allstop:  number[]; // 所有关闭的设备
}