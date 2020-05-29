import { CommonData } from '../redmodel/commondata.model';
import { CommonDataActionUnion, CommonDataActionTypes } from '../redactions/commondata.actions';

export const initialState: CommonData = {
    name: '',
    hasProcess: {},
    allstop: [],
};

export function reducer(state = initialState, action: CommonDataActionUnion):CommonData {
    switch (action.type) {
        case CommonDataActionTypes.ADD_NAME: {
            return {...state, name: action.playload.name};
        }

        case CommonDataActionTypes.ADD_PROCESSES: {
            return {...state, hasProcess: action.playload.hasProcess};
        }

        case CommonDataActionTypes.ADD_ALLSTOP: {
            return {...state, allstop: action.playload.allstop};
        }

        case CommonDataActionTypes.CLEAN: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
