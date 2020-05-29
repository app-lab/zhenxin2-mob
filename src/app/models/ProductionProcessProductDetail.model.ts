// 生产过程产品详情
export interface ProductionProcessProductDetail {
	id ? : number;
	woId ? : number;
	productId ? : number;
	productCode ? : string;
	productName ? : string;
	procedureId ? : string;
	status ? : number;
	isDel ? : number;
	[ propName: string ]: any;
}