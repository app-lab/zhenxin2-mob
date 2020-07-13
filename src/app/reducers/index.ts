import {
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
	MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CommonData } from '../redmodel/commondata.model';

import * as commondataReducer from '../reducers/commondata.reducer'

export interface State {
	commondata: CommonData,
}

export const reducers: ActionReducerMap < State > = {
	commondata: commondataReducer.reducer
};

export function debug(reducer: ActionReducer < any > ): ActionReducer < any > {
	return (state, action) => {
		return reducer(state, action);
	};
}


export const metaReducers: MetaReducer < State > [] = !environment.production ? [debug] : [];

export const getCommondata = createFeatureSelector < State,
	CommonData > ('commondata');

export const getName = createSelector(getCommondata, (state: CommonData) => state.name);
export const getProcesses = createSelector(getCommondata, (state: CommonData) => state.hasProcess);
export const getAllStop = createSelector(getCommondata, (state: CommonData) => state.allstop);