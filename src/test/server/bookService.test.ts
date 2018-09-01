import * as promise from "bluebird";
import { BookService } from '../../Service/bookService';
import { HttpAgent } from '../../Service/httpUtility';

describe('book service test suite', () => {
    it('sample service test sayHi()', () => {
        let mockHttpAgent = new HttpAgent();
        spyOn(mockHttpAgent, "get").and.returnValue(new promise(
            (resolve,reject)=>{
                resolve(`<div id="content">Title<br>Subtitle<div>first</div><div>second</div></div>`);
            }
        ));
        let bookService = new BookService("http://www.fake.com", mockHttpAgent);
        let actualResult = bookService.getContent("123_456", "20");
        actualResult.then(
            value => {
                expect(value).toBe('<p>Title</p><p>Subtitle</p><p>first</p><p>second</p>');
            }, error => {
                expect(error).toBe(`failed by ${error}`);
            });
    });
});