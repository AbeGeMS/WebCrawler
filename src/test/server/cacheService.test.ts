import * as Promise from "bluebird";
import { createClient } from "redis";
import { CacheService } from "../../Service/cacheService";
import { HttpAgent } from "../../Service/httpUtility";
import {
    mockbookTitle,
    mockBookService,
    mockHttpSpyon,
    mockRedisAgent,
    mockRedisSpyon,
    mockResdisBook
} from "./mockProvider";

describe("cacheService test suit", () => {

    it("getBookList_Test", (done) => {
        mockHttpSpyon();
        mockRedisSpyon();
        let cache = new CacheService(mockBookService, mockRedisAgent);

        cache.getBookList().then(
            books => {
                expect(books.length).toBe(3, "the book list length should be 3");
                books.forEach((book, index) => {
                    expect(book.BookId).toBe(mockResdisBook[index], `the ${index} book should be ${mockResdisBook[index]}`);
                    expect(book.Name).toBe(mockbookTitle, "the name should be fakeBook");
                });
                done();
            },
            error => {
                expect(error).toBe(`Failed by ${error}`);
                done();
            }
        );
    });
});