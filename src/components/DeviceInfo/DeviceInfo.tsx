import React, { useState, useEffect } from 'react';
import './DeviceInfo.css';
import { Box } from '../../elements/Box';
import { ValueTable, ValueTableRow } from '../../elements/valueTable';
import { InitialDeviceInfos } from './types';
import Bowser from 'bowser';
const browser = Bowser.getParser(window.navigator.userAgent);

const getOrientation = (): 'portrait' | 'landscape' => {
    if (window.matchMedia('(orientation:portrait)').matches) {
        return 'portrait';
    } else {
        return 'landscape';
    }
};

const getInitialState = (): InitialDeviceInfos => {
    const deviceInfo = browser.getResult();

    return {
        ...deviceInfo,
        resolution: {
            width: window.screen.width,
            height: window.screen.height,
            dpr: window.devicePixelRatio || 1,
            depth: window.screen.colorDepth,
        },
        orientation: getOrientation(),
        touchPoints: window.navigator.maxTouchPoints,
    };
};

const useDeviceInfos = (): [InitialDeviceInfos] => {
    const [deviceInfos, setDeviceInfos] = useState(getInitialState());

    useEffect(() => {
        if (!window.navigator.getBattery) return;

        window.navigator.getBattery().then(battery => {
            setDeviceInfos(prevDeviceInfos => {
                return {
                    ...prevDeviceInfos,
                    battery,
                };
            });
        });
    }, []);

    return [deviceInfos];
};

export const DeviceInfo: React.FunctionComponent<{}> = () => {
    const [deviceInfos] = useDeviceInfos();
    const { resolution, orientation, battery, touchPoints } = deviceInfos;

    return (
        <Box title="Your Device">
            <ValueTable>
                <ValueTableRow
                    label="Manufacturer"
                    value={deviceInfos.platform.vendor}
                    description="Manufacturer of your current used device"
                />
                <ValueTableRow
                    label="Operating System"
                    value={`${deviceInfos.os?.name} ${deviceInfos.os?.versionName || ''} (Version ${
                        deviceInfos.os?.version
                    })`}
                    description="Current Operating System on your device"
                />
                <ValueTableRow
                    label="Client"
                    value={`${deviceInfos.browser?.name} (Version ${deviceInfos.browser?.version})`}
                    description="The Browser you are using"
                />
                <ValueTableRow
                    label="Device Type"
                    value={`${deviceInfos.platform?.type} (${deviceInfos.platform?.model ||
                        navigator.platform ||
                        'unknown'})`}
                    description="Detecting if you are browsing with a desktop computer or a mobile device"
                />
                <ValueTableRow
                    label="Resolution"
                    value={`${resolution.width}×${resolution.height} (${resolution.depth} Bit)`}
                    description="Resolution of your device in pixels. Actual pixels for high resolution displays are shown in brackets"
                />
                <ValueTableRow
                    label="Device Orientation"
                    value={`${orientation}`}
                    description="How you hold your device"
                />
                {battery && (
                    <ValueTableRow
                        label="Battery"
                        value={`${battery.level * 100} % (${battery.charging ? 'is charging' : 'not charging'})`}
                        description="The current energy levels"
                    />
                )}
                <ValueTableRow
                    label="Multitouch"
                    value={`${touchPoints && touchPoints > 1 ? 'yes' : 'no'}`}
                    description="Can you use multiple fingers to operate on your device?"
                />
            </ValueTable>
        </Box>
    );
};
