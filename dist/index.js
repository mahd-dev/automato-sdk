"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AutomatoSDK {
    constructor(apiKey, hostName, token) {
        this.setTokenCookie = (response, token) => {
            response.headers.append("Set-Cookie", `automato_token=${token}; HttpOnly; Secure; Path=/;`);
            return response;
        };
        this.clearTokenCookie = (response) => {
            response.headers.append("Set-Cookie", "automato_token=; HttpOnly; Secure; Path=/; Max-Age=0");
            return response;
        };
        this.apiKey = apiKey;
        this.hostName = hostName;
        this.token = token ? `Bearer ${token}` : undefined;
    }
    getTokenFromCookies(req) {
        const cookieHeader = req.headers.get("Cookie");
        if (!cookieHeader)
            return null;
        const cookiePairs = cookieHeader.split(";").map((c) => {
            const [key, value] = c.trim().split("=");
            return [key, value ? decodeURIComponent(value) : ""];
        });
        const cookies = new Map(cookiePairs);
        return cookies.get("automato_token") || null;
    }
    validateContactProps(props) {
        // TODO : Validation logic here
    }
    validateEventProps(eventProps) {
        // TODO : Validation logic here
    }
    identify(props = [], token) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `${this.hostName}/auth/contacts/identify`;
            this.validateContactProps(props);
            const headers = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            const payload = {
                api_key: this.apiKey,
                props: props,
            };
            try {
                const response = yield fetch(endpoint, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    const errorData = yield response.json();
                    throw new Error(errorData.message || "Error communicating with the API");
                }
                const data = yield response.json();
                if (data.status === "success") {
                    return data.token;
                }
                else {
                    throw new Error(data.message || "Unknown error occurred");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    createEvent(eventName, eventDate, eventProps = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `${this.hostName}/events/create-new`;
            this.validateEventProps(eventProps);
            const headers = {
                "Content-Type": "application/json",
            };
            headers["Authorization"] = this.token;
            const payload = {
                api_key: this.apiKey,
                event_name: eventName,
                event_date: eventDate,
                props: eventProps,
            };
            try {
                const response = yield fetch(endpoint, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    const errorData = yield response.json();
                    throw new Error(errorData.message || "Error communicating with the API");
                }
                const data = yield response.json();
                if (data.status === "success") {
                    return data.event_id;
                }
                else {
                    throw new Error(data.message || "Unknown error occurred");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    upsertContactProp(bearerToken, prop) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = `${this.hostName}/contact-props/upsert`;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            };
            try {
                const response = yield fetch(endpoint, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(prop),
                });
                if (!response.ok) {
                    const errorData = yield response.json();
                    throw new Error(errorData.message || "Error communicating with the API");
                }
                // Handle success response here
                // If there's no specific data to return, you can simply return void
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AutomatoSDK;
//# sourceMappingURL=index.js.map