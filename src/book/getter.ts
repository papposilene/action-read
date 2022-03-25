import {exportVariable} from "@actions/core";
import isbn from "node-isbn";
import addBook from "./setter";
import {CleanBook} from "./cleaner";

export type Book = {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
        type: string;
        identifier: string;
    }[];
    readingModes: {
        text: boolean;
        image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
    };
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
};

export type BookOptions = {
    date: string;
    body?: string;
    bookIsbn: string;
    providers: string[];
};

export default async function getBook(
    options: BookOptions,
    fileName: string
): Promise<CleanBook[]> {
    const {bookIsbn, providers} = options;
    try {
        const book = (await isbn.provider(providers).resolve(bookIsbn)) as Book;
        exportVariable("BookTitle", book.title);
        return (await addBook(options, book, fileName)) as CleanBook[];
    } catch (error) {
        throw new Error(error.message);
    }
}
