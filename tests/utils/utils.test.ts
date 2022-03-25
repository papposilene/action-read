/**
import { promises, readFileSync } from "fs";
import {
    removeWrappedQuotes,
    isIsbn,
    isDate,
    sortByDate
} from "../../src/utils/globals";

import book from "../fixture.json";
import addBook from "../../src/book/setter";

const books = readFileSync("./data/read.json", "utf-8");

jest.mock("@actions/core");

const date = "2022-02-22";

it("to Json", async () => {
    jest.spyOn(promises, "readFile").mockResolvedValueOnce(books);
    expect(
        JSON.stringify(
            await addBook(
                {
                    date,
                    body: "Amazing!",
                    bookIsbn: "0525658181",
                    providers: []
                },

                book,
                "./data/read.json"
            )
        )
    ).toMatchSnapshot();
});

it("removeWrappedQuotes", () => {
    expect(removeWrappedQuotes("hello")).toBe("hello");
    expect(removeWrappedQuotes("\"hello\"")).toBe("hello");
    expect(removeWrappedQuotes("this says \"hello\".")).toBe("this says \"hello\".");
    expect(removeWrappedQuotes("\"this part will get cut off\"--")).toBe(
        "this part will get cut off…"
    );
});

it("isDate", () => {
    expect(isDate("abcde")).toEqual(false);
    expect(isDate("2022-02-22")).toEqual(true);
    expect(isDate("2022")).toEqual(false);
});

it("isIsbn", () => {
    expect(isIsbn("1234567890")).toEqual(true);
    expect(isIsbn("1234567890123")).toEqual(true);
    expect(isIsbn("123456789012")).toEqual(false);
    expect(isIsbn("12345678901234")).toEqual(false);
    expect(isIsbn("1")).toEqual(false);
});

it("sortByDate", () => {
    expect(
        sortByDate([
            { dateFinished: "2020-01-01" },
            { dateFinished: "1900-01-01" },
            { dateFinished: "2020-11-01" }
        ])
    ).toEqual([
        { dateFinished: "1900-01-01" },
        { dateFinished: "2020-01-01" },
        { dateFinished: "2020-11-01" }
    ]);
});
*/
