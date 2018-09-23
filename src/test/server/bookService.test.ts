import {
    mockHttpAgent, fakeHtml,
    mockBookService, expectedContent,
    expectedTableOfContent, mockHttpSpyon,
    mockbookTitle
} from "./mockProvider";

describe('book service test suite', () => {

    beforeAll(() => mockHttpSpyon(), 10000);

    it(`getContent_Test`, (done) => {
        let actualResult = mockBookService.getContent("123_456", "20");
        actualResult.then(
            value => {
                expect(value).toEqual(expectedContent);
                done();
            }, error => {
                expect(error).toBe(`Failed by ${error}`);
                done();
            });
    });

    it(`getTableOfContent_Test`, (done) => {
        let actualResult = mockBookService.getTableOfContent("123_456");
        actualResult.then(
            value => {
                expect(value).toEqual(expectedTableOfContent);
                done();
            },
            error => {
                expect(error).toBe(`Failed by ${error}`);
                done();
            }
        );
    });

    it("getTitle_Test", (done) => {
        let actualResult = mockBookService.getTitle("123_456");
        actualResult.then(
            title => {
                expect(title).toBe(mockbookTitle, `the title should be ${mockbookTitle}`);
                done();
        },
        error=>{
            expect(error).toBe(`Failed by ${error}`);
            done();
        }
        );
    });
});