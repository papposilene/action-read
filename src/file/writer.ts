import {writeFile} from "fs/promises";
import {setFailed} from "@actions/core";
import {CleanBook} from "../book/cleaner";

export default async function returnWriteFile(
    fileName: string,
    bookMetadata: CleanBook[]
) {
    try {
        const data = JSON.stringify(bookMetadata);
        const promise = writeFile(fileName, data);
        await promise;
    } catch (error) {
        setFailed(error);
    }
}
