import { setFailed } from "@actions/core";
import { promises, readFileSync } from "fs";
import returnWriteFile from "../../src/file/writer";
import { CleanBook } from "../../src/book/cleaner";

const booksJson = JSON.parse(readFileSync("./data/read.json", "utf-8")) as CleanBook[];

jest.mock("@actions/core");

describe("returnWriteFile", () => {
    test("works for json", async () => {
        jest.spyOn(promises, "writeFile").mockResolvedValueOnce();
        await returnWriteFile("myfile.json", booksJson);
        expect(promises.writeFile).toHaveBeenCalled();
    });
    test("fails for json", async () => {
        jest.spyOn(promises, "writeFile").mockRejectedValue("Error");
        await returnWriteFile("myfile.json", booksJson);
        expect(setFailed).toHaveBeenCalledWith("Error");
    });
});
