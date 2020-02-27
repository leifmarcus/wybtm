export interface CurrenIpAddresses {
    ip4: string;
    ip6: string;
}

export interface LocationResponse {
    status?: 'success' | 'fail';
    ip4?: string;
    ip6?: string;
    continent?: string;
    country?: string;
    countryCode?: string;
    city?: string;
    zip?: string;
    lat?: number;
    lon?: number;
    timezone?: string;
    currency?: string;
    isp?: string;
}

export const getClientIP4 = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error('could not load client ip from "api.ipify.org"');
        }
        const { ip } = await response.json();

        return ip;
    } catch (error) {
        return error;
    }
};

export const getClientIP6 = async (): Promise<string | undefined> => {
    try {
        const response = await fetch('http://wybtm.leifmarcus.com/api/ip/');
        if (!response.ok) {
            throw new Error('could not load client ip6 from "http://wybtm.leifmarcus.com/api/ip/"');
        }
        const { ip } = await response.json();

        return ip;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const requestLocationInformation = async (ip: string): Promise<LocationResponse | null> => {
    try {
        const response = await fetch(
            `http://ip-api.com/json/${ip}?fields=status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`,
        );
        if (!response.ok) {
            throw new Error('could not load client ip6 from "http://wybtm.leifmarcus.com/api/ip/"');
        }
        const json: LocationResponse = await response.json();

        if (json.status !== 'success') {
            throw new Error('request was not successful');
        }

        return { ...json };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getLocationInformation = async (): Promise<LocationResponse | null> => {
    const ip4 = await getClientIP4();
    const ip6 = await getClientIP6();
    const locationInfo = await requestLocationInformation(ip4);

    if (!locationInfo) return null;

    return {
        ip4,
        ip6,
        continent: locationInfo.continent,
        country: locationInfo.country,
        countryCode: locationInfo.countryCode,
        city: locationInfo.city,
        zip: locationInfo.zip,
        lat: locationInfo.lat,
        lon: locationInfo.lon,
        isp: locationInfo.isp,
        timezone: locationInfo.timezone,
        currency: locationInfo.currency,
    };
};
