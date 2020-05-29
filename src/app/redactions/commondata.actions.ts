import { Action } from '@ngrx/store';
import { Procedure } from '../models/Procedure.model';


export enum CommonDataActionTypes {
    ADD_NAME = '[Commondata] Add Name',
    ADD_PROCESSES = '[Commondata] Add Process',
    ADD_ALLSTOP = '[Commondata] Add Allstop',
    CLEAN = '[Commondata] Clean',
}

export class AddName implements Action {
    readonly type = CommonDataActionTypes.ADD_NAME
    constructor(public playload: {name:string}) {}
}

export class AddProcesses implements Action {
    readonly type = CommonDataActionTypes.ADD_PROCESSES
    constructor(public playload: {hasProcess:{ [place: number]: Procedure[]}}) {}
}

export class AddAllStop implements Action {
    readonly type = CommonDataActionTypes.ADD_ALLSTOP
    constructor(public playload: {allstop:number[]}) {}
}


export class Clean implements Action {
    readonly type = CommonDataActionTypes.CLEAN
    constructor() {}
}

export type CommonDataActionUnion = 
            | AddName
            | AddProcesses
            | AddAllStop
            | Clean;