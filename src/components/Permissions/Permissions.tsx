import React, { useState, useEffect } from 'react';
import './Permissions.css';
import { Box } from '../../elements/Box';
import { ValueTable, ValueTableRow } from '../../elements/valueTable';

interface AvailablePermission {
    name: PermissionName | 'display-capture' | 'background-fetch' | 'nfc';
    label: string;
    value?: string;
    description?: string;
}

interface Permission {
    name: string;
    title: string;
    state?: string;
    description?: string;
}

const availablePermissions: Array<AvailablePermission> = [
    {
        name: 'geolocation',
        label: 'Geolocation',
        description: '',
    },
    {
        name: 'notifications',
        label: 'notifications',
        description: '',
    },
    {
        name: 'push',
        label: 'push',
        description: '',
    },
    {
        name: 'midi',
        label: 'midi',
        description: '',
    },
    {
        name: 'camera',
        label: 'camera',
        description: '',
    },
    {
        name: 'microphone',
        label: 'microphone',
        description: '',
    },
    {
        name: 'speaker',
        label: 'speaker',
        description: '',
    },
    {
        name: 'device-info',
        label: 'Device Info',
        description: '',
    },
    {
        name: 'background-fetch',
        label: 'Background Fetch',
        description: '',
    },
    {
        name: 'background-sync',
        label: 'Background Sync',
        description: '',
    },
    {
        name: 'bluetooth',
        label: 'Bluetooth',
        description: '',
    },
    {
        name: 'persistent-storage',
        label: 'Persistent Storage',
        description: '',
    },
    {
        name: 'ambient-light-sensor',
        label: 'Ambient Light Sensor',
        description: '',
    },
    {
        name: 'accelerometer',
        label: 'Accelerometer',
        description: '',
    },
    {
        name: 'gyroscope',
        label: 'Gyroscope',
        description: '',
    },
    {
        name: 'magnetometer',
        label: 'Magnetometer',
        description: '',
    },
    {
        name: 'clipboard',
        label: 'Clipboard',
        description: '',
    },
    {
        name: 'display-capture',
        label: 'Display Capture',
        description: '',
    },
    {
        name: 'nfc',
        label: 'NFC',
        description: '',
    },
];

const usePermissions = (): [Permission[]] => {
    const [permissions, setPermissions] = useState<Array<Permission>>([]);

    useEffect(() => {
        availablePermissions.forEach(permission => {
            try {
                navigator.permissions
                    .query({ name: permission.name as PermissionName })
                    .then(result => {
                        setPermissions(prevPermissions => [
                            ...prevPermissions,
                            {
                                name: permission.name,
                                title: permission.label,
                                description: permission.description,
                                state: result.state,
                            },
                        ]);
                    })
                    .catch(() => {
                        console.error(`'${permission.name}' is not available in this browser.`);
                    });
            } catch (error) {}
        });
    }, []);
    return [permissions];
};

export const Permissions: React.FunctionComponent<{}> = () => {
    const [permissions] = usePermissions();

    if (!permissions.length) {
        return null;
    }

    return (
        <Box title="Your Browser Permissions">
            <ValueTable>
                {permissions.map(permission => {
                    return (
                        <ValueTableRow
                            key={permission.name}
                            label={permission.title}
                            value={permission.state}
                            description={permission.description}
                        />
                    );
                })}
            </ValueTable>
        </Box>
    );
};
