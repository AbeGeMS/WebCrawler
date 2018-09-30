import { CacheService } from "../../Service/cacheService";
import {
    mockbookTitle,
    mockBookService,
    mockHttpSpyon,
    mockRedisAgent,
    mockRedisSpyon,
    mockResdisBook,
    mockCharpter
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

    it("getLatestCharpter_Test", (done) => {
        mockHttpSpyon();
        mockRedisSpyon();
        let cache = new CacheService(mockBookService, mockRedisAgent);

        cache.getLatestCharpter("fakeId").then(
            charpter => {
                expect(charpter).toBe(parseInt(mockCharpter), "the charpter should be 456");
                done();
            },
            error => {
                expect(error).toBe(`Failed by ${error}`);
                done();
            }
        );
    });
});