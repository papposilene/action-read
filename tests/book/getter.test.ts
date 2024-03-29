import getBook from "../../src/book/getter";
import { exportVariable } from "@actions/core";
import { promises, readFileSync } from "fs";
import isbn from "node-isbn";
import book from "../fixture.json";

const books = readFileSync("./data/read.testing.json", "utf-8");
const date = "2020-09-12";

jest.mock("@actions/core");

describe("getBook", () => {
    test("works", async () => {
        jest.spyOn(isbn, "resolve").mockResolvedValueOnce(book);
        jest.spyOn(promises, "readFile").mockResolvedValueOnce(books);
        await getBook(
            { date, bookIsbn: "9780525658184", providers: ["google"] },
            "./data/read.testing.json"
        );
        expect(exportVariable).toHaveBeenNthCalledWith(
            1,
            "BookTitle",
            "Transcendent Kingdom"
        );
        expect(exportVariable).toHaveBeenNthCalledWith(
            2,
            "BookThumbOutput",
            "book-9780525658184.png"
        );
        expect(exportVariable).toHaveBeenNthCalledWith(
            3,
            "BookThumb",
            "https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        );
        jest.spyOn(promises, "readFile").mockResolvedValueOnce(books);
        expect(
            await getBook(
                { date, bookIsbn: "9780525658184", providers: ["google"] },
                "./data/read.testing.json"
            )
        ).toMatchSnapshot();
    });
    test("fails", async () => {
        jest.spyOn(isbn, "resolve").mockRejectedValue({ message: "Error!" });
        await expect(
            getBook(
                { date, bookIsbn: "9780525658184", providers: ["google"] },
                "./data/read.testing.json"
            )
        ).rejects.toMatchInlineSnapshot(`[Error: Error!]`);
    });
});
