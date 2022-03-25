import toJson from "../../src/utils/json";
import { promises } from "fs";

jest.mock("@actions/core");

describe("toJson", () => {
    const mockedData = JSON.parse('{"title": "my title"}');
    test("works", async () => {
        jest.spyOn(promises, "readFile").mockResolvedValueOnce(mockedData);
        expect(await toJson("myfile.json")).toEqual([{ title: "my title" }]);
    });
});
