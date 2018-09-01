import * as cheerio from "cheerio";
import * as Promise from "bluebird";
import { HttpAgent } from "./httpUtility";

export interface ContantElement {
    P: string;
}

export interface TitleElement {
    Href: string;
    Title: string;
}

export class BookService {
    constructor(bookDomain: string, agent: HttpAgent) {
        this._http = agent;
        this.bookDomain = bookDomain;
    }

    private readonly _http: HttpAgent;
    private readonly bookDomain: string;

    public getContent(bookId: string, chapterId: string)
        : Promise<string> {
        try {
            let url = `${this.bookDomain}/${bookId}/${chapterId}`;
            return this._http.get(url).then(html=>{
                return this.parseContent(html)
                .map(v=>v.P)
                .reduce(
                    (previous,current)=>`${previous}<p>${current}</p>`,
                    ""
                );
            });
        } catch (ex) {
            return new Promise((resolve, reject) => {
                reject(JSON.stringify(ex));
            });
        }
    }

    private parseContent(html: string): ContantElement[] {
        let _$ = cheerio.load(html);
        let contentList = _$("#content");
        let result = contentList.contents().toArray()
            .filter((elem) => !_$(elem).is('br'))
            .map((element) => {
                return { P: _$(element).text().trim() };
            });
        return result;
    }

    private parsTable(html: string): TitleElement[] {
        let _$ = cheerio.load(html);
        let tableList = _$("#list dd").toArray();
        return tableList.map(caption => {
            let aElem = _$(caption).children().first();
            return { Href: aElem.attr("href"), Title: aElem.text() };
        });
    }

    private parsTile(html: string): string {
        let _$ = cheerio.load(html);
        return _$("#info h1").text();
    }
}