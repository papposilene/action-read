import parseTitle from "../../src/utils/parser";
import { setFailed } from "@actions/core";

jest.mock("@actions/core");

describe("parseTitle", () => {
    const today = new Date().toISOString().slice(0, 10);
    test("works", () => {
        expect(parseTitle("1234567890")).toEqual({
            bookIsbn: "1234567890",
            date: today
        });
        expect(parseTitle("1234567890 ")).toEqual({
            bookIsbn: "1234567890",
            date: today
        });
        expect(parseTitle("1234567890123")).toEqual({
            bookIsbn: "1234567890123",
            date: today
        });
        expect(parseTitle("1234567890 2020-01-12")).toEqual({
            bookIsbn: "1234567890",
            date: "2020-01-12"
        });
        expect(parseTitle("1234567890123 2020-01-12")).toEqual({
            bookIsbn: "1234567890123",
            date: "2020-01-12"
        });
        expect(parseTitle("1234567890123 abcde")).toEqual({
            bookIsbn: "1234567890123",
            date: today
        });
    });
    test("fails", () => {
        expect(parseTitle("12345678901234 abcde")).toEqual({
            bookIsbn: undefined,
            date: today
        });
        expect(setFailed).toHaveBeenCalledWith(
            "ISBN is not valid: 12345678901234 abcde"
        );
    });
});
