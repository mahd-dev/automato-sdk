export type ValueType =
  | "string"
  | "date"
  | "datetime-local"
  | "time"
  | "number"
  | "boolean";

export interface ContactProp {
  key: string;
  value_type: ValueType;
  value: string | number | boolean | Date; // Adjust based on ValueType
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
  api_key: string;
  event_name: string;
  event_date: string;
  props: EventProps;
}

export default class AutomatoSDK {
  public hostName: string;
  public apiKey: string;
  public token?: string;

  constructor(apiKey: string, hostName: string, token?: string) {
    this.apiKey = apiKey;
    this.hostName = hostName;
    this.token = token ? `Bearer ${token}` : undefined;
  }

  public getTokenFromCookies(req: Request): string | null {
    const cookieHeader = req.headers.get("Cookie");
    if (!cookieHeader) return null;

    const cookiePairs = cookieHeader.split(";").map((c) => {
      const [key, value] = c.trim().split("=");
      return [key, value ? decodeURIComponent(value) : ""];
    });

    const cookies = new Map<string, string>(
      cookiePairs as Iterable<[string, string]>
    );
    return cookies.get("automato_token") || null;
  }

  public setTokenCookie = (response: Response, token: string): Response => {
    response.headers.append(
      "Set-Cookie",
      `automato_token=${token}; HttpOnly; Secure; Path=/;`
    );
    return response;
  };

  public clearTokenCookie = (response: Response): Response => {
    response.headers.append(
      "Set-Cookie",
      "automato_token=; HttpOnly; Secure; Path=/; Max-Age=0"
    );
    return response;
  };

  public validateContactProps(props: ContactProp[]): void {
    // TODO : Validation logic here
  }

  public validateEventProps(eventProps: EventProps): void {
    // TODO : Validation logic here
  }

  public async identify(
    props: ContactProp[] = [],
    token?: string
  ): Promise<string> {
    const endpoint = `${this.hostName}/auth/contacts/identify`;
    this.validateContactProps(props);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const payload: AuthPayload = {
      api_key: this.apiKey,
      props: props,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error communicating with the API"
        );
      }

      const data = await response.json();
      if (data.status === "success") {
        return data.token;
      } else {
        throw new Error(data.message || "Unknown error occurred");
      }
    } catch (error) {
      throw error;
    }
  }

  public async createEvent(
    eventName: string,
    eventDate: string,
    eventProps: EventProps = {}
  ): Promise<string> {
    const endpoint = `${this.hostName}/events/create-new`;
    this.validateEventProps(eventProps);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    headers["Authorization"] = this.token!;

    const payload: EventPayload = {
      api_key: this.apiKey,
      event_name: eventName,
      event_date: eventDate,
      props: eventProps,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error communicating with the API"
        );
      }

      const data = await response.json();
      if (data.status === "success") {
        return data.event_id;
      } else {
        throw new Error(data.message || "Unknown error occurred");
      }
    } catch (error) {
      throw error;
    }
  }

  public async upsertContactProp(
    bearerToken: string,
    prop: ContactProp
  ): Promise<void> {
    const endpoint = `${this.hostName}/contact-props/upsert`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(prop),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error communicating with the API"
        );
      }

      // Handle success response here
      // If there's no specific data to return, you can simply return void
    } catch (error) {
      throw error;
    }
  }
}
