import { BookModel } from "../../public/script/model/bookModel";
import { DataProvider } from "../../public/script/provider/dataProvider";

describe('Client test', () => {
    it('SampleModel.getServiceMessage should be', () => {
        let testModel: BookModel = new BookModel();
        let testProvider: DataProvider = new DataProvider();
        let mockDeferred: JQueryDeferred<string> = $.Deferred<string>();
        let expectedName = "Hi spy";
        mockDeferred.resolve(expectedName);
        spyOn(testProvider, "getSayHi").and.returnValue(mockDeferred.promise());
        testModel.Provider = testProvider;
        let expectedResult = `server said:
            ${expectedName}`;
        testModel.getServerMessage()
            .then(actualResult => {
                expect(actualResult).toBe(expectedResult);
            });
    });

    it("BookModel.BookDomain should be set success",()=>{
        let fakeBookDomain = "https://fake.book.com ";
        let testModel:BookModel = new BookModel();
        expect(testModel.BookDomain)
            .toBeNull(`BookDomain initial value should be null but actual is ${testModel.BookDomain} `); 
        testModel.BookDomain = fakeBookDomain;
        expect(testModel.BookDomain).toBe(`${fakeBookDomain.trim()}/`,`BookDomain should be set successfully`);
    });

    it("BookId should be set success",()=>{
        let fakeBookId= "n_mxyz";
        let testModel:BookModel = new BookModel();
        expect(testModel.BookId)
            .toBeNull(`BookId initial value should be null but actual is ${testModel.BookDomain} `); 
        testModel.BookId= fakeBookId;
        expect(testModel.BookId).toBe(fakeBookId,`BookIdshould be set successfully`);
    });
});