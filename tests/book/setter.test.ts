import addBook from "../../src/book/setter";
import {promises, readFileSync} from "fs";
import {exportVariable} from "@actions/core";
import book from "../fixture.json";

const books = readFileSync("./data/read.testing.json", "utf-8");
const date = "2020-09-12";

jest.mock("@actions/core");

describe("addBook", () => {
    test("works", async () => {
        jest.spyOn(promises, "readFile").mockResolvedValueOnce(books);
        expect(
            await addBook(
                {
                    date,
                    body: "Amazing!",
                    bookIsbn: "0525658181",
                    providers: []
                },
                book,
                "data/read.testing.json"
            )
        ).toMatchSnapshot();
        expect(exportVariable).toHaveBeenNthCalledWith(
            1,
            "BookThumbOutput",
            "book-0525658181"
        );
        expect(exportVariable).toHaveBeenNthCalledWith(
            2,
            "BookThumb",
            "https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        );
    });

    test("works, no images", async () => {
        jest.spyOn(promises, "readFile").mockResolvedValueOnce(books);
        expect(
            await addBook(
                {
                    date,
                    body: "Amazing!",
                    bookIsbn: "0525658181",
                    providers: []
                },
                {
                    ...book,
                    imageLinks: {}
                },

                "data/read.testing.json"
            )
        ).toMatchSnapshot();
        expect(exportVariable).not.toHaveBeenNthCalledWith(
            1,
            "BookThumbOutput",
            "book-0525658181"
        );
        expect(exportVariable).not.toHaveBeenNthCalledWith(
            2,
            "BookThumb",
            "https://books.google.com/books/content?id=ty19yQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        );
    });

    test("works, empty file", async () => {
        jest.spyOn(promises, "readFile").mockResolvedValueOnce("[]");
        expect(
            await addBook(
                {
                    date,
                    body: "Brilliant!",
                    bookIsbn: "0525658181",
                    providers: []
                },
                book,
                "data/read.testing.json"
            )
        ).toMatchSnapshot();
    });
});
