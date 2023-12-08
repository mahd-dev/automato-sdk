type ValueType = "string" | "date" | "datetime-local" | "time" | "number" | "boolean";
interface Prop {
    key: string;
    value_type: ValueType;
    value: string | number | boolean | Date;
}
export default class AutomatoSDK {
    private hostName;
    private apiKey;
    constructor(apiKey: string, hostName: string);
    getTokenFromCookies(req: Request): string | null;
    setTokenCookie: (response: Response, token: string) => Response;
    clearTokenCookie: (response: Response) => Response;
    validateProps(props: Prop[]): void;
    identify(props?: Prop[], token?: string): Promise<string>;
    upsertContactProp(bearerToken: string, prop: Prop): Promise<void>;
}
export {};
