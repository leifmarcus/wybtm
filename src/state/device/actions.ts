// eslint-disable no-restricted-globals
import { DeviceAction } from './types';

export const initializeDeviceInfo = (): DeviceAction => {
    return {
        type: 'INITIALIZE_DEVICE_INFO',
        payload: {
            resolution: {
                width: window.screen.width,
                height: window.screen.height,
                dpr: window.devicePixelRatio,
            },
            platform: navigator.platform,
        },
    };
};
