import { getCookie } from "./getCookie";
import { ACCESS_TOKEN_NAME, BASE_ROUTE } from "~/constants";

const config = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': BASE_ROUTE,
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
}

const filesConfig = {
    'Content-Type': `multipart/form-data;charset=utf-8`
}

type Headers = {
    headers: typeof config | {'Authorization'?: string}
}

export function getApiHeaders(auth=false, jwt?: string, isFiles=false): Headers {
    if (auth) {
        const headers = {
                ...config,
                'Authorization': `Bearer ${jwt || getCookie(ACCESS_TOKEN_NAME)}`
        }

        return {
            headers: isFiles ? {...headers, ...filesConfig} : {...headers}
        }
    } else {
        return {
            headers: {
                ...config
            }
        }
    }
}