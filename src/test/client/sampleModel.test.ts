import { SampleModel } from "../../public/script/model/sampleModel";
import { DataProvider } from "../../public/script/provider/dataProvider";

describe('Client test', () => {
    it('SampleModel.getServiceMessage should be', () => {
        let testModel: SampleModel = new SampleModel();
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
});