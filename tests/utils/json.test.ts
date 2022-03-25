import toJson from "../../src/utils/json";
import { promises } from "fs";
import { setFailed } from "@actions/core";

jest.mock("@actions/core");

describe("toJson", () => {
    test("works not empty", async () => {
        jest.spyOn(promises, "readFile").mockResolvedValueOnce('[{"title": "my title"}]');
        expect(await toJson("myfile.json")).toEqual([{ "title": "my title" }]);
    });

    test("fails", async () => {
        jest
            .spyOn(promises, "readFile")
            .mockResolvedValueOnce('{"title": my title}');
        await toJson("myfile.json");
        expect(setFailed).toHaveBeenCalledWith(
            expect.stringContaining("Unexpected token m in JSON at position 10")
        );
    });
});
