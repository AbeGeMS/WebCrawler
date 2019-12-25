import * as cheerio from "cheerio";
import * as Promise from "bluebird";
import { HttpAgent } from "./httpUtility";
import { ContentData, TitleData } from "../lib/typings/dataModel";

export class BookService {
    constructor(bookDomain: string, agent: HttpAgent) {
        this._http = agent;
        this.bookDomain = bookDomain;
    }

    private readonly _http: HttpAgent;
    private readonly bookDomain: string;

    public getContent(bookId: string, chapterId: string, index:number)
        : Promise<ContentData> {
        try {
            let url = `${this.bookDomain}${chapterId}`;

            return this._http.get(url).then(
                html => {
                    let result = this.parseContent(html);
                    result.Index = index;
                    return result;
                }
            );
        } catch (ex) {

            return new Promise((resolve, reject) => {
                reject(JSON.stringify(ex));
            });
        }
    }

    public getTableOfContent(bookId: string): Promise<TitleData[]> {
        try {
            let url = `${this.bookDomain}${bookId}/`;

            return this._http.get(url)
                .then(html => {
                    let _$ = cheerio.load(html);
                    let tableList = _$("#list dd").toArray();
                    return tableList.map(caption => {
                        let aElem = _$(caption).children().first();
                        return { Href: aElem.attr("href"), Title: aElem.text() };
                    });
                });
        } catch (ex) {
            return new Promise((resolve, reject) => reject(JSON.stringify(ex)));
        }

    }

    public getTitle(bookId: string): Promise<string> {
        try {
            let url = `${this.bookDomain}${bookId}/`;
            return this._http.get(url).then(html => {
                return this.parsTile(html);
            }, err => { return JSON.stringify(err) });
        } catch (ex) {
            return new Promise((resolve, reject) => reject(JSON.stringify(ex)));
        }
    }

    public getSource(url:string):Promise<string>{
        return this._http.get(url).then(html=>html);
    }

    private parseContent(html: string): ContentData {
        let _$ = cheerio.load(html);
        let contentList = _$("#content");
        let title = _$(".bookname h1").text().trim().replace(/\n/g,"");
        let content = contentList.contents().toArray()
            .filter((elem) => !_$(elem).is('br') && _$(elem).text().trim() !== "")
            .map((element) => {
                return _$(element).text().trim();
            });

        return { Index: -1, Title: title, Content: content };
    }

    private parsTile(html: string): string {
        let _$ = cheerio.load(html);
        return _$("#info h1").text().trim().replace(/\n/g, '');
    }
}