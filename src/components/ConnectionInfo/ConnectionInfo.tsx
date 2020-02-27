import React, { useState, useEffect } from 'react';
import './ConnectionInfo.css';
import { Box } from '../../elements/Box';
import { ValueTable, ValueTableRow } from '../../elements/valueTable';
import { getLocationInformation } from '../../utils/connection';
import { LocationResponse } from '../../utils/connection';

const useConnectionInfo = (): [LocationResponse | null] => {
    const [connectionInfo, setConnectionInfo] = useState<LocationResponse | null>(null);

    useEffect(() => {
        getLocationInformation().then(information => {
            setConnectionInfo(information);
        });
    }, []);

    return [connectionInfo];
};

export const ConnectionInfo: React.FunctionComponent<{}> = () => {
    const [connectionInfo] = useConnectionInfo();

    if (!connectionInfo) {
        return null;
    }

    return (
        <Box title="Your IP and Location">
            <ValueTable>
                <ValueTableRow
                    label="IP4 Address"
                    value={connectionInfo?.ip4}
                    description="your public ip address (https://api.ipify.org?format=json)"
                />
                {connectionInfo?.ip6 && (
                    <ValueTableRow
                        label="IP6 Address"
                        value={connectionInfo?.ip6}
                        description="your public ip address"
                    />
                )}
                <ValueTableRow label="ISP" value={connectionInfo?.isp} description="Internet Service Provider" />
                <ValueTableRow
                    label="Continent"
                    value={`${connectionInfo?.continent}`}
                    description="The Continent detected from your ip-address"
                />
                <ValueTableRow
                    label="Country"
                    value={`${connectionInfo?.country} (${connectionInfo?.countryCode})`}
                    description="The Country detected from your ip-address"
                />
                <ValueTableRow
                    label="City"
                    value={`${connectionInfo.zip} ${connectionInfo?.city}`}
                    description="The City detected from your ip-address"
                />
                <ValueTableRow
                    label="Latitude"
                    value={`${connectionInfo?.lat}`}
                    description="latitude of your ip address"
                />
                <ValueTableRow
                    label="Longitude"
                    value={`${connectionInfo?.lon}`}
                    description="longitude of your ip address"
                />
                <ValueTableRow
                    label="Time Zone"
                    value={`${connectionInfo?.timezone}`}
                    description="In which timezone you live"
                />
                <ValueTableRow
                    label="Currency"
                    value={`${connectionInfo?.currency}`}
                    description="How you like to pay"
                />
                {window.navigator?.connection && (
                    <ValueTableRow
                        label="Download Bandwith"
                        value={`${window.navigator.connection?.downlink} MBit/s`}
                        description="How fast your connection is"
                    />
                )}
            </ValueTable>
        </Box>
    );
};
