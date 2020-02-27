import { get as getFingerprint, Component, x64hash128 } from 'fingerprintjs2';

interface FingerprintData {
    fingerprintDataUrl: string;
    fingerprintNumber: string;
}
const getFingerprintData = (components: Array<Component>): FingerprintData => {
    const canvas = components.find(component => {
        return component.key === 'canvas';
    });

    const fingerprintDataUrl = canvas ? canvas.value[1].replace('canvas fp:', '') : '';

    const fingerprintNumber = x64hash128(JSON.stringify(components), 32);

    return {
        fingerprintDataUrl,
        fingerprintNumber,
    };
};
export const requestFingerprint = async (): Promise<FingerprintData> => {
    return new Promise<FingerprintData>(resolve => {
        if (window.requestIdleCallback) {
            requestIdleCallback(() => {
                getFingerprint(components => {
                    resolve(getFingerprintData(components));
                });
            });
        } else {
            setTimeout(() => {
                getFingerprint(components => {
                    resolve(getFingerprintData(components));
                });
            }, 500);
        }
    });
};
