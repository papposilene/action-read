import {setFailed} from "@actions/core";
import returnReadFile from "../file/reader";

export default async function toJson(fileName: string) {
    try {
        const contents = (await returnReadFile(fileName)) as string;
        return JSON.parse(contents) || [];
    } catch (error) {
        setFailed(error.message);
    }
}
