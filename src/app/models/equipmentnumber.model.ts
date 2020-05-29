export interface EquipmentNumber {
    areaCode: string;
    areaId: number;
    areaName: string;
    equipmentClassCode: string;
    equipmentClassId: number;
    equipmentCode: string;
    equipmentDesc: string;
    equipmentModel: string;
    equipmentName: string;
    factory: string;
    id: number
    programList: TheProgram[]
}


export interface TheProgram {
    equipmentId: number;
    id: number;
    name: string;
    params: string;
    remark: string;
}