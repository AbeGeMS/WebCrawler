import * as cheerio from "cheerio";
import * as Promise from "bluebird";
import { HttpAgent } from "./httpUtility";

export interface ContantData {
    Title: string;
    Content: string[];
}

export interface TitleData {
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
        : Promise<ContantData> {
        try {
            let url = `${this.bookDomain}/${bookId}/${chapterId}`;
            return this._http.get(url).then(
                html => this.parseContent(html));
        } catch (ex) {
            return new Promise((resolve, reject) => {
                reject(JSON.stringify(ex));
            });
        }
    }

    private parseContent(html: string): ContantData {
        let _$ = cheerio.load(html);
        let contentList = _$("#content");
        let title = this.parsTile(html);
        let content = contentList.contents().toArray()
            .filter((elem) => !_$(elem).is('br') && _$(elem).text().trim() !== "")
            .map((element) => {
                return _$(element).text().trim();
            });

        return { Title: title, Content: content };
    }

    private parsTable(html: string): TitleData[] {
        let _$ = cheerio.load(html);
        let tableList = _$("#list dd").toArray();
        return tableList.map(caption => {
            let aElem = _$(caption).children().first();
            return { Href: aElem.attr("href"), Title: aElem.text() };
        });
    }

    private parsTile(html: string): string {
        let _$ = cheerio.load(html);
        return _$("#info h1").text().trim().replace(/\n/g,'');
    }
}