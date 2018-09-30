import { BookMark } from "../../public/script/model/bookMarkModel";
import { DataProvider } from "../../public/script/provider/dataProvider";
import { BookMarkData } from "../../lib/typings/dataModel";

describe("BookMarkModel test suit", () => {
    let testModel: BookMark = new BookMark();
    let testProvider: DataProvider = new DataProvider();
    let fakeBooks: BookMarkData[] = [
        {
            BookId: "book001",
            Name: "Book 001",
        },
        {
            BookId: "book002",
            Name: "Book 002"
        }
    ];

    beforeEach(() => {
        let mockDeferred: JQueryDeferred<boolean> = $.Deferred<boolean>();
        mockDeferred.resolve(true);
        let latestChapterDeffer = $.Deferred<number>();
        latestChapterDeffer.resolve(456);
        let booksDeffer = $.Deferred<BookMarkData[]>();
        booksDeffer.resolve(fakeBooks);
        spyOn(testProvider, "deleteBookMark").and.returnValue(mockDeferred.promise());
        spyOn(testProvider, "getLatestChapterNumber").and.returnValue(latestChapterDeffer.promise());
        spyOn(testProvider, "getBookMarks").and.returnValue(booksDeffer.promise());
        testModel.Provider = testProvider;
    });

    it("deleteBook_Test", (done: () => void) => {
        testModel.deleteBook("1_1234").then(vaule => {
            expect(vaule).toBeTruthy(`Delete book should success.`);
            done();
        }, err => {
            expect(err).toBeNull(`Delete book throw exception by: ${err}`);
            done();
        });
    });

    it("getLatestChapter_Test", (done) => {
        testModel.getLatestChapter("fakebook001").then(chapter => {
            expect(chapter).toBe(456, "the latest chapter should be 456");
            done();
        }, err => {
            expect(err).toBeNull(`Get latest chapter throw exception by ${err}`);
            done();
        });
    });

    it("getBooks_Test",done=>{
        testModel.getBooks().then(books=>{
            expect(books.length).toBe(2,"the book lenght should be 2");
            books.forEach((book, index) => {
                expect(book.BookId).toBe(fakeBooks[index].BookId, "the book id should be correct");
                expect(book.Name).toBe(fakeBooks[index].Name, "the Name should be correct");
            });
            done();
        },err=>{
            expect(err).toBeNull(`get books throw exception by ${err}`);
            done();
        });
    });
});