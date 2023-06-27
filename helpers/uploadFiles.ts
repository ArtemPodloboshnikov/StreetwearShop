import { getApiHeaders } from "./getApiHeaders";
import { API_FILES_UPLOAD } from "~/constants";

type ResponseFile = {
    name: string,
    url: string
}

export async function uploadFiles(
    func: (url: string, data?: any, config?: any | undefined)=>Promise<ResponseFile[]>,
    files: FileList,
    folderName: string,
    apiRoute=API_FILES_UPLOAD) {
    const formData = new FormData();
    for (let i=0; i < files.length; i++) {
        formData.append(`files`, files[i]);
    }
    formData.append('folder', folderName);

    return await func(apiRoute, formData, getApiHeaders(true, '', true));
}