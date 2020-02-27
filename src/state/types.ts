import { DeviceState, DeviceActionTypes } from './device/types';
import { Action } from 'redux';

export interface AppState {
    device: DeviceState;
}

export type AppActionTypes = DeviceActionTypes;

export interface AppActions extends Action<AppActionTypes> {
    payload: DeviceState;
}
