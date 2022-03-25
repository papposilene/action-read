import { setFailed } from "@actions/core";
import { promises } from "fs";
import returnReadFile from "../../src/file/reader";

jest.mock("@actions/core");

describe("returnReadFile", () => {
    test("works", async () => {
        jest.spyOn(promises, "readFile").mockResolvedValueOnce("Hello world");
        expect(await returnReadFile("myfile.json")).toEqual("Hello world");
    });
    test("fails", async () => {
        jest.spyOn(promises, "readFile").mockRejectedValue("Error");
        await returnReadFile("myfile.json");
        expect(setFailed).toHaveBeenCalledWith("Error");
    });
});
