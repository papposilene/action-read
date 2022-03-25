import {exportVariable} from "@actions/core";
import cleanBook, {CleanBook} from "./cleaner";
import {sortByDate} from "../utils/globals";
import toJson from "../utils/json";
import {Book, BookOptions} from "./getter";

export default async function addBook(
    options: BookOptions,
    book: Book,
    fileName: string
) {
    // convert the file to JSON
    const readListJson = (await toJson(fileName)) as CleanBook[];
    // clean up book data
    const newBook: CleanBook = cleanBook(options, book);
    // export book thumbnail to download later
    if (newBook.imageLinks && newBook.imageLinks.thumbnail) {
        exportVariable("BookThumbOutput", `book-${newBook.isbn}.png`);
        exportVariable("BookThumb", newBook.imageLinks.thumbnail);
    }
    // append new book
    readListJson.push(newBook);
    return sortByDate(readListJson);
}
