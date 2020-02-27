import { Action } from 'redux';

export type DeviceActionTypes = 'INITIALIZE_DEVICE_INFO';

export interface DeviceState {
    resolution?: {
        width: number;
        height: number;
        dpr: number;
    };
    userAgent?: string;
    platform?: string;
    battery?: {
        charging: boolean;
        chargingTime: number;
        dischargingTime: number;
        level: number;
    };
}

export interface DeviceAction extends Action<DeviceActionTypes> {
    payload: DeviceState;
}
