export interface Procedure {
    id: number;
    procedureCode?: string;
    procedureName?: string;
    procedureParam?: string;
    stationId: string;
    status?: number;
    type?: number; // 工序的类型--是返修还是普通还是什么
    procedureDesc?: string;
    params: string; // 工序---程序号参数
}

export interface UpParamList {
    title?: string;
    param?: UpParamItem[];
    [propName: string]: any;
}

export interface UpParamItem {
    label?: string;
    type?: number;
    defaultValue?: string;
    range?: string[];
    readOnly?: boolean;
    [propName: string]: any;
}