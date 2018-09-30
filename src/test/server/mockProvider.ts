import * as promise from "bluebird";
import { TitleData, ContantData } from "../../lib/typings/dataModel";
import { HttpAgent } from "../../Service/httpUtility";
import { BookService } from "../../Service/bookService";
import { RedisAgent } from "../../Service/redisUtility";

// Book Service
export const fakeHtml =
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
        <div id="content">Book Title<br>Subtitle
            <div>first</div>
            <div>second</div>
        </div>
    </div>`;

export let expectedContent: ContantData = {
    Title: "001 FakeBook",
    Content: ["Book Title", "Subtitle", "first", "second"],
};

export let expectedTableOfContent: TitleData[] = [{
    Href: "www.fake.com/001",
    Title: "chapter 001",
}, {
    Href: "www.fake.com/002",
    Title: "chapter 002",
}];

export let mockbookTitle = "001 FakeBook";

export let mockHttpAgent = new HttpAgent();

export let mockBookService = new BookService("http://www.fake.com", mockHttpAgent);

export function mockHttpSpyon() {
    spyOn(mockHttpAgent, "get").and.returnValue(new promise(
        (resolve, reject) => {
            resolve(fakeHtml);
        }
    ));
};

// Redis Service 

export let mockResdisBook = ["book001", "book002", "book003"];
export let mockRedisAgent = new RedisAgent();
export let mockCharpter = "456";
export function mockRedisSpyon() {
    spyOn(mockRedisAgent, "SCAN").and.returnValue(mockRedisSCANPromise);
    spyOn(mockRedisAgent, "get").and.returnValue(mockRedisGetPromise);
}

let mockRedisSCANPromise = new Promise<string[]>((resolve, reject) => resolve(mockResdisBook));
let mockRedisGetPromise = new Promise<string>((resolve, reject) => resolve(mockCharpter));