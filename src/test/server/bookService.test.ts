import * as promise from "bluebird";
import { BookService, ContantData} from '../../Service/bookService';
import { HttpAgent } from '../../Service/httpUtility';

const fakeHtml = 
    `<div id="info">
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
    it('sample service test sayHi()', () => {
        let mockHttpAgent = new HttpAgent();
        spyOn(mockHttpAgent, "get").and.returnValue(new promise(
            (resolve,reject)=>{
                resolve(fakeHtml);
            }
        ));
        let bookService = new BookService("http://www.fake.com", mockHttpAgent);
        let actualResult = bookService.getContent("123_456", "20");
        let expectResult: ContantData={
            Title:"001 FakeBook",
            Content: ["Title", "Subtitle", "first", "second"],
        } 
        actualResult.then(
            value => {
                expect(value).toEqual(expectResult);
            }, error => {
                expect(error).toBe(`failed by ${error}`);
            });
    });
});