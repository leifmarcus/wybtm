export interface InitialDeviceInfos extends Bowser.Parser.ParsedResult {
    resolution: {
        width: number;
        height: number;
        dpr: number;
        depth: number;
    };
    orientation: string;
    battery?: {
        charging: boolean;
        chargingTime: number;
        level: number;
    };
    touchPoints?: number;
}
