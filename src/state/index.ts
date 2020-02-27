import { combineReducers, Store, createStore } from 'redux';
import { deviceReducer } from './device/reducer';
import { initializeDeviceInfo } from './device/actions';
import { AppState, AppActions } from './types';
import { composeWithDevTools } from 'redux-devtools-extension';

declare global {
    interface Navigator {
        connection: {
            downlink: number;
        };
        getBattery: () => Promise<{ charging: boolean; chargingTime: number; level: number }>;
    }
}

export default combineReducers({
    device: deviceReducer,
});

export const initializeStore = (): Store<AppState, AppActions> => {
    const rootReducer = combineReducers({
        device: deviceReducer,
    });

    const store = createStore(rootReducer, composeWithDevTools());

    store.dispatch(initializeDeviceInfo());

    return store;
};
