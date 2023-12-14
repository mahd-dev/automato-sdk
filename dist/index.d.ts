export type ValueType = "string" | "date" | "datetime-local" | "time" | "number" | "boolean";
export interface ContactProp {
    key: string;
    value_type: ValueType;
    value: string | number | boolean | Date;
}
export interface EventProp {
    type: ValueType;
    value: string | number | boolean | Date;
}
export interface EventProps {
    [key: string]: {
        type: ValueType;
        value: string | number | boolean | Date;
    };
}
export interface AuthPayload {
    api_key: string;
    props?: ContactProp[];
}
export interface EventPayload {
    name: string;
    event_date: string;
    props: EventProps;
}
export default class AutomatoSDK {
    hostName: string;
    apiKey: string;
    token?: string;
    constructor(apiKey: string, hostName: string, token?: string);
    getTokenFromCookies(req: Request): string | null;
    setTokenCookie: (response: Response, token: string) => Response;
    clearTokenCookie: (response: Response) => Response;
    validateContactProps(props: ContactProp[]): void;
    validateEventProps(eventProps: EventProps): void;
    identify(props?: ContactProp[], token?: string): Promise<string>;
    createEvent(eventName: string, eventDate: string, eventProps?: EventProps): Promise<string>;
    upsertContactProp(prop: ContactProp): Promise<void>;
}
