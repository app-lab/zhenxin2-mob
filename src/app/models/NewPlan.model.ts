export interface NewPlan {
    id: number;
    orderId?: number; // 订单id
    orderCode?: string; // 订单编码
    orderName?: string; // 订单名称
    customerId?: number; // 客户id
    customerCode?: string; // 客户编码
    customerName?: string; // 客户名称
  
    name: string; // 原片名称
    batchNumber: string;  // 批次号
    comeTime: string; // 来料时间
    quantity: number; // 数量
    pieceCount: string; // 片号
    jylist: string; // 晶圆单个片号列表
  
    areaId: number; // 所在区域id
    areaCode: string; // 所在区域编码
    areaName: string; // 所在区域名称
  
    processFlowId: string; // 工艺流程id
    processFlowCode: string; // 工艺流程编码
    processFlowName: string; // 工艺流程名称
    processFlowDetails: Blob; // 工艺流程详情--节点数据
  
    priority: string; // 优先级
    woDesc: string; // 备注
    paramList: string; // 大文本，关联程序号的参数列表，一定要存
    status: number; // 状态，区分是计划(0)还是工单(2)
}