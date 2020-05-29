export interface Station {
    id: number;
    stationCode?: string;
    stationName: string;
    areaCode?: string;
    areaName?: string;
    stationDesc?: string;
    procedureId?: string;
    equipment_id: string; // 工位包含的设备列表
}