import * as promise from "bluebird";
import { BookService, ContantData, TitleData } from '../../Service/bookService';
import { HttpAgent } from '../../Service/httpUtility';

const fakeHtml =
    `<div class="tableOfContent">
        <div id="list">
            <dd>
                <a href="www.fake.com/001">chapter 001</a>
            </dd>
            <dd>
                <a href="www.fake.com/002">chapter 002</a>
            </dd>
        </div>
    </div>
    <div id="info">
        <h1>
        001 FakeBook
        </h1>
    </div>
    <div>
        <div id="content">Title<br>Subtitle
            <div>first</div>
            <div>second</div>
        </div>
    </div>`;

describe('book service test suite', () => {

    let expectedContent: ContantData = {
        Title: "001 FakeBook",
        Content: ["Title", "Subtitle", "first", "second"],
    };

    let expectedTableOfContent: TitleData[] = [{
        Href: "www.fake.com/001",
        Title: "chapter 001",
    }, {
        Href: "www.fake.com/002",
        Title: "chapter 002",
    }];

    let mockHttpAgent = new HttpAgent();

    let bookService = new BookService("http://www.fake.com", mockHttpAgent);

    beforeAll(() => {
        spyOn(mockHttpAgent, "get").and.returnValue(new promise(
            (resolve, reject) => {
                resolve(fakeHtml);
            }
        ));
    }, 10000);

    it(`getContent should return ${expectedContent}`, () => {
        let actualResult = bookService.getContent("123_456", "20");
        actualResult.then(
            value => {
                expect(value).toEqual(expectedContent);
            }, error => {
                expect(error).toBe(`Failed by ${error}`);
            });
    });

    it(`getTableOfContent should return ${expectedTableOfContent}`, () => {
        let actualResult = bookService.getTableOfContent("123_456");
        actualResult.then(
            value => {
                expect(value).toEqual(expectedTableOfContent);
            },
            error => {
                expect(error).toBe(`Failed by ${error}`);
            }
        );
    });
});