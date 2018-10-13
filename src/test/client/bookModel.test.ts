import { BookModel } from "../../public/script/model/bookModel";
import { DataProvider } from "../../public/script/provider/dataProvider";

describe("BookModel test suit", () => {
    it("getBookContent_test", (done) => {
        let model = new BookModel();
        let mockProvider = new DataProvider();
        spyOn(mockProvider, "getbookContent").and.returnValue({
            Index: 0,
            Title: "fake Title",
            Content: ["fake 01", "fake 02"],
        });
        model.Provider = mockProvider;
        model.getBookContent("fake_book",
            ["book_id/chapter01.html", "book_id/chapter02.html", "book_id/chapter03.html"]).then(value => {
                expect(value.length).toBe(3, "The result book content count should be 3");
                expect(value[0]).toEqual({ Index: 0, Title: "fake Title", Content: ["fake 01", "fake 02"] },
                    "the content should same");
                done();
            });
    });
});