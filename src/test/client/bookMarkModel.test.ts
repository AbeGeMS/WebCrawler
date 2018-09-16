import { BookMark } from "../../public/script/model/bookMarkModel";
import { DataProvider } from "../../public/script/provider/dataProvider";

describe("BookMarkModel test suit", () => {
    it("deleteBook_Test", (done: () => void) => {
        let testModel: BookMark = new BookMark();
        let testProvider: DataProvider = new DataProvider();
        let mockDeferred: JQueryDeferred<boolean> = $.Deferred<boolean>();
        mockDeferred.resolve(true);
        spyOn(testProvider, "deleteBookMark").and.returnValue(mockDeferred.promise());
        testModel.Provider = testProvider;
        testModel.deleteBook("1_1234").then(vaule => {
            expect(vaule).toBeTruthy(`Delete book should success.`);
            done();
        }, err => {
            expect(err).toBeNull(`Delete book throw exception by: ${err}`);
            done();
        });
    });
});