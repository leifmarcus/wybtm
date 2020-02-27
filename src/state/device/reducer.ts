import { Reducer } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import { DeviceState, DeviceAction } from './types';

const initialState: DeviceState = {};

export const deviceReducer: Reducer<DeviceState, DeviceAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_DEVICE_INFO':
            return cloneDeep(action.payload);
        default:
            return state;
    }
};
