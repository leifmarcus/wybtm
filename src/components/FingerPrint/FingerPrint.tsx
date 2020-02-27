import React, { useState, useEffect } from 'react';
import './FingerPrint.css';
import { Box } from '../../elements/Box';
import { ValueTable, ValueTableRow } from '../../elements/valueTable';
import { requestFingerprint } from '../../utils/fingerprint';

const useFingerprint = (): [string, string] => {
    const [fpDataUrl, setFpDataUrl] = useState('');
    const [fpHash, setFpHash] = useState('');
    useEffect(() => {
        requestFingerprint().then(fp => {
            setFpDataUrl(fp.fingerprintDataUrl);
            setFpHash(fp.fingerprintNumber);
        });
    }, []);

    return [fpDataUrl, fpHash];
};

export const FingerPrint: React.FunctionComponent<{}> = () => {
    const [fpDataUrl, fpHash] = useFingerprint();
    return (
        <Box title="Your Device Fingerprint">
            <ValueTable>
                <ValueTableRow
                    label="Fingerprint Hash"
                    value={`${fpHash}`}
                    description="this hash is generated from gathered device information"
                />
                <ValueTableRow
                    label="Canvas Fingerprint"
                    value={<img className="FingerPrint__image" src={fpDataUrl} alt="Device Fingerprint" />}
                    description="The image is generated inside your browser."
                />
            </ValueTable>
        </Box>
    );
};
