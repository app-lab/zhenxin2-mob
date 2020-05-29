export interface StopEquipment {
    areaCode: string
    areaId: number
    areaName: string;
    equipmentClassCode: string;
    equipmentClassId: number;
    equipmentCode: string;
    equipmentDesc: string;
    equipmentModel: string;
    equipmentName: string;
    factory: string;
    id: number;
    programList: string;
    stationList: AffectStation[]
}

export interface AffectStation {
    areaCode: string;
    areaId: number;
    areaName: string;
    equipment_id: number;
    id: number;
    stationCode: string;
    stationDesc: string;
    stationName: string;
    status: number;
}