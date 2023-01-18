import { getCookie } from "./getCookie";
import { BASE_ROUTE } from "~/constants";

const config = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': BASE_ROUTE,
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
}

type Headers = {
    headers: typeof config | {'Authorization'?: string}
}

export function getApiHeaders(tokenName?: string, jwt?: string): Headers {
    if (tokenName) {
        return {
            headers: {
                ...config,
                'Authorization': `Bearer ${jwt || getCookie(tokenName)}`
            }
        }
    } else {
        return {
            headers: {
                ...config
            }
        }
    }
}